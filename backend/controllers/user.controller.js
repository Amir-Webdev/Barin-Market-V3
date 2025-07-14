import crypto from "crypto";
import User from "../models/user.model.js";
import { newError } from "../utils/errorHandler.js";
import generateToken from "../utils/generateToken.js";
import { emailSender } from "../utils/emailSender.js";
import { toPersianDigits } from "../../frontend/src/utils/toPersianDigits.js";

// @desc    Auth User & Get Token
// @route   POST /api/user/login
// @access  Public
async function authUser(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isCorrectPassword = await user?.matchPassword(password);
  const isVerified = user?.isVerified;

  if (!user || !isCorrectPassword || !isVerified) {
    return next(newError(401, "ایمیل یا رمز عبور نامعتبر"));
  }

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    addresses: user.addresses,
    likes: user.likes,
  });
}

// @desc    Register User
// @route   POST /api/user
// @access  Public
async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  if (!password || !email || !name)
    return next(newError(400, "همه ی فیلد ها باید پر شوند"));

  // email  valid format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(newError(400, "فرمت ایمیل وارد شده صحیح نیست"));
  }

  if (password.length < 8) {
    return next(newError(400, "رمز عبور باید حداقل ۸ کاراکتر باشد"));
  }

  let user = await User.findOne({ email });

  if (user) {
    if (user.isVerified)
      return next(newError(400, "کاربری با این ایمیل وجود دارد"));

    const timeSinceLastAttempt = Date.now() - user.updatedAt;
    const cooldownPeriod = 10 * 60 * 1000; // 10 mins

    if (timeSinceLastAttempt < cooldownPeriod) {
      const remainingTime = Math.ceil(
        (cooldownPeriod - timeSinceLastAttempt) / 1000 / 60
      );

      return next(
        newError(
          400,
          `لطفا ایمیل خود را چک کنید. مدت زمان باقیمانده تا درخواست دوباره: ${toPersianDigits(
            remainingTime
          )} دقیقه`
        )
      );
    }
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const subject = "تایید ایمیل شما || بارین مارکت";

  const message = `
  <div style="font-family: Arial, sans-serif; max-width: 600px;">
    <h2>سلام ${name},</h2>
    <p>برای تکمیل ثبت نام در بارین مارکت، لطفاً ایمیل خود را تأیید کنید:</p>
    <a href="${verificationUrl}" 
       style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">
       تأیید ایمیل
    </a>
    <p>اگر این درخواست از طرف شما نبوده است، این ایمیل را نادیده بگیرید.</p>
    <hr>
    <small>بارین مارکت</small>
  </div>
`;

  const emailResult = await emailSender(email, subject, message);

  if (emailResult.rejected && emailResult.rejected.length > 0) {
    return next(
      newError(400, "ارسال ایمیل با مشکل مواجه شد. لطفا ایمیل را بررسی کنید")
    );
  }

  if (user) {
    user.name = name;
    user.password = password;
    user.verificationToken = hashedToken;
    user.updatedAt = new Date();
  } else {
    user = new User({
      name,
      email,
      password,
      verificationToken: hashedToken,
    });
  }

  const newUserRegister = await user.save();

  if (newUserRegister) {
    res.status(201).json({
      message: `ایمیل حاوی لینک فعالسازی به ${email} ارسال شد.`,
    });
  } else {
    return next(newError(400, "مشکلی در ثبت نام بوجود آمد. مجددا تلاش کنید."));
  }
}

// @desc    Verify User Email
// @route   POST /api/user/verify
// @access  Public
async function verifyEmail(req, res, next) {
  const { token } = req.query;

  if (!token) return next(newError(404, "No token query"));

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpires: { $gte: Date.now() },
  });

  if (!user) return next(newError(400, "توکن منقضی شده یا نامعتبر"));

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  const verifiedUser = await user.save();

  if (!verifiedUser)
    return next(newError(400, "حساب تایید نشد. مجددا تلاش کنید"));

  generateToken(res, user._id);

  res.status(200).json(verifiedUser);
}

// @desc    Forget Password Request
// @route   POST /api/user/forgetpassword
// @access  Public
async function forgetPassword(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(newError(404, "کاربری با این ایمیل یافت نشد"));

  const timeSinceLastAttempt = Date.now() - user.updatedAt;
  const cooldownPeriod = 10 * 60 * 1000; // 10 mins

  if (timeSinceLastAttempt < cooldownPeriod) {
    const remainingTime = Math.ceil(
      (cooldownPeriod - timeSinceLastAttempt) / 1000 / 60
    );

    return next(
      newError(
        400,
        ` مدت زمان باقیمانده تا درخواست دوباره: ${toPersianDigits(
          remainingTime
        )} دقیقه`
      )
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`;
  const subject = "بازیابی رمز عبور";
  const message = `لینک بازیابی رمزعبور: ${resetUrl}`;

  const emailResult = await emailSender(email, subject, message);

  if (emailResult.rejected && emailResult.rejected.length > 0) {
    return next(
      newError(400, "ارسال ایمیل با مشکل مواجه شد. لطفا ایمیل را بررسی کنید")
    );
  }

  user.isVerified = false;
  user.verificationToken = hashedToken;
  const newForgetPassword = await user.save();

  if (newForgetPassword) {
    res.status(201).json({
      message: `ایمیل حاوی لینک بازیابی رمز عبور به ${email} ارسال شد.`,
    });
  } else {
    return next(
      newError(
        400,
        "مشکلی در فرایند بازیابی رمز عبور بوجود آمد. مجددا تلاش کنید."
      )
    );
  }
}

// @desc    Reset Password Request
// @route   POST /api/user/resetpassword
// @access  Public
async function resetPassword(req, res, next) {
  const { userId, token, email, password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    _id: userId,
    verificationToken: hashedToken,
    verificationTokenExpires: { $gte: Date.now() },
  });

  if (!user)
    return next(newError(404, "کاربری با این ایمیل و یا توکن یافت نشد"));

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  user.password = password;
  const newResetPassword = await user.save();

  if (newResetPassword) {
    res.status(200).json({
      message: "رمز با موفقیت بازیابی شد",
    });
  } else {
    return next(
      newError(
        400,
        "مشکلی در فرایند بازیابی رمز عبور بوجود آمد. مجددا تلاش کنید."
      )
    );
  }
}

// @desc    Logout User & Clear Cookie
// @route   POST /api/user/logout
// @access  Private
async function logoutUser(req, res, next) {
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(200)
    .json({ message: "با موفقیت از سیستم خارج شدید" });
}

// @desc    Get User Profile
// @route   GET /api/user/profile
// @access  Private
async function getUserProfile(req, res, next) {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(newError(404, "کاربر پیدا نشد"));
  }
}

// @desc    Update User Profile
// @route   PUT /api/user/profile
// @access  Private
async function updateUserProfile(req, res, next) {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.addresses = req.body.addresses || user.addresses;

    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();

    res.status(200).json({
      __id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      addresses: updatedUser.addresses,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return next(newError(404, "کاربر پیدا نشد"));
  }
}

// @desc    Get User Liked Products
// @route   GET /api/user/:userId/likes
// @access  Private
async function getLikedProducts(req, res, next) {
  const { userId } = req.params;

  if (userId !== req.user._id.toString())
    return next(newError(400, "مجاز به گرفتن این اطلاعات نیستید"));

  const user = await User.findById(userId);

  const populatedUser = await user.populate({
    path: "likes",
    populate: {
      path: "product",
    },
  });

  res.status(200).json({ likedProducts: populatedUser.likes });
}

// @desc    Get Users
// @route   GET /api/user
// @access  Private/ADMIN
async function getUsers(req, res, next) {
  const users = await User.find({}).select("-password");
  if (!users) return next(newError(404, "کاربری پیدا نشد"));
  res.status(200).json(users);
}

// @desc    Get User By ID
// @route   GET /api/user/:id
// @access  Private/ADMIN
async function getUserById(req, res, next) {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return next(newError(404, "کاربری با این شناسه پیدا نشد"));
  res.status(200).json(user);
}

// @desc    Delete User
// @route   DELETE /api/user/:id
// @access  Private/ADMIN
async function deleteUser(req, res, next) {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!req.user.isAdmin && req.user.id !== id) {
    return next(newError("مجاز به حذف این کاربر نیستید."));
  }

  if (!user) {
    return next(newError(404, "کاربری با این شناسه پیدا نشد"));
  } else if (user.isAdmin) {
    return next(newError(400, "کاربران مدیر قابل حذف نیستند"));
  } else {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "کاربر با موفقیت حذف شد" });
  }
}

// @desc    Update User
// @route   PUT /api/user/:id
// @access  Private/ADMIN
async function updateUser(req, res, next) {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(newError(404, "کاربری پیدا نشد"));

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);

  const updatedUser = await user.save();
  if (!updatedUser) return next(newError(500, "کاربر به‌روزرسانی نشد"));

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
}

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  getLikedProducts,
};
