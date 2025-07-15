import Button from "../components/UI/Button";
import SEOMeta from "../components/Util/SEOMeta";
import { toPersianDigits } from "../utils/toPersianDigits";

function ContactUs() {
  return (
    <>
      <SEOMeta title=" تماس با ما | بارین مارکت" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10 border-b pb-4">
          تماس با ما
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">فرم تماس</h2>
            <form className="space-y-4">
              <div>
                <label className="label" htmlFor="name">
                  <span className="label-text">نام کامل</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="phone">
                  <span className="label-text">شماره تماس</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="email">
                  <span className="label-text">ایمیل</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label" htmlFor="message">
                  <span className="label-text">پیام شما</span>
                </label>
                <textarea
                  id="message"
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>

              <Button disabled>ارسال پیام - بزودی</Button>
            </form>
          </div>

          <div className="border border-border rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-6">اطلاعات تماس</h2>
              <div className="space-y-4 text-right">
                <p>
                  <strong>شماره تماس:</strong> {toPersianDigits("34095039")}-
                  {toPersianDigits("026")}
                </p>
                <p>
                  <strong>ایمیل پشتیبانی:</strong> Barintechnology@gmail.com
                </p>
                <p>
                  <strong>ساعات پاسخ‌گویی:</strong> روز های کاری{" "}
                  {toPersianDigits("10")} تا {toPersianDigits("20")}
                </p>
                <p>
                  <strong>آدرس:</strong> کرج، بلوار یادگار امام، مجتمع اداری
                  تجاری نور هشتم، طبقه ۷، واحد ۷
                </p>
              </div>
            </div>

            <div className="mt-6">
              <iframe
                title="company location"
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d202.19134148745266!2d50.96413993252349!3d35.82296766299941!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1752572820394!5m2!1sen!2s"
                className="w-full h-48 rounded-xl border mt-4"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
