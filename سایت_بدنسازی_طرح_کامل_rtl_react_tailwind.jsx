import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// =========================
// تنظیمات قابل شخصی‌سازی
// =========================
const DEFAULT_PRICES = {
  training: 100000,
  nutrition: 100000,
  supplements: 100000,
  bundle: 300000,
};

// تبدیل اعداد به فارسی
const toPersianDigits = (n: number | string) =>
  n
    .toString()
    .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)]);

const toman = (n: number) => `${toPersianDigits(n.toLocaleString("fa-IR"))} تومان`;

// آیتم‌های خدمات
const services = [
  {
    title: "برنامه تمرینی",
    desc: "برنامه اختصاصی مطابق هدف، سطح و محدودیت‌های شما با آموزش تصویری هر حرکت.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9"><path fill="currentColor" d="M13 3h-2v3H8v2h3v3h2V8h3V6h-3zM5 14h14v2H5zM5 18h14v2H5z"/></svg>
    ),
    key: "training" as const,
  },
  {
    title: "برنامه تغذیه",
    desc: "منوی روزانه دقیق با کالری و ماکروها، متناسب با ذائقه و شرایط پزشکی شما.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9"><path fill="currentColor" d="M17 3a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM8 7v10h2V7zm6 0v10h2V7z"/></svg>
    ),
    key: "nutrition" as const,
  },
  {
    title: "مکمل‌های استاندارد",
    desc: "پیشنهاد مکمل‌های مجاز و ایمن با دوز مصرفی استاندارد بر اساس شواهد علمی.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9"><path fill="currentColor" d="M7 3h10v6H7zM5 11h14v10H5z"/></svg>
    ),
    key: "supplements" as const,
  },
  {
    title: "آماده‌سازی مسابقات",
    desc: "پلان تخصصی برای پرورش اندام، فیزیک و بادی‌کلاسیک با پیگیری هفتگی.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9"><path fill="currentColor" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z"/></svg>
    ),
    key: "prep" as const,
  },
];

// کارت قیمت
function PriceCard({
  title,
  price,
  features,
  onSelect,
}: {
  title: string;
  price: number;
  features: string[];
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-zinc-900/80 backdrop-blur p-6 shadow-xl ring-1 ring-zinc-700 hover:shadow-2xl transition"
    >
      <h3 className="text-xl font-bold mb-2 text-zinc-100">{title}</h3>
      <p className="text-3xl font-extrabold mb-4 text-white">{toman(price)}</p>
      <ul className="space-y-2 text-zinc-300 text-sm leading-7">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block size-1.5 rounded-full bg-emerald-400"></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSelect} className="mt-6 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
        انتخاب و ادامه
      </button>
    </motion.div>
  );
}

// فرم سفارش
function OrderForm({ selected }: { selected: string | null }) {
  const [fileName, setFileName] = useState<string>("");
  return (
    <div id="order" className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">ثبت سفارش</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "نام و نام خانوادگی", type: "text" },
          { label: "سن", type: "number" },
          { label: "جنسیت (زن/مرد)", type: "text" },
          { label: "قد (سانتی‌متر)", type: "number" },
          { label: "وزن (کیلوگرم)", type: "number" },
          { label: "درصد چربی (اختیاری)", type: "number" },
        ].map((f, i) => (
          <label key={i} className="flex flex-col gap-2 text-zinc-200 text-sm">
            {f.label}
            <input type={f.type as any} className="bg-zinc-900/70 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
          </label>
        ))}
        <label className="flex flex-col gap-2 text-zinc-200 text-sm md:col-span-2">
          هدف (کاهش وزن، افزایش حجم، مسابقه و …)
          <input className="bg-zinc-900/70 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <label className="flex flex-col gap-2 text-zinc-200 text-sm md:col-span-2">
          محدودیت‌ها / آسیب‌دیدگی‌ها
          <textarea rows={3} className="bg-zinc-900/70 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </label>
        <div className="md:col-span-2">
          <p className="text-zinc-200 text-sm mb-2">آپلود تصویر بدن با مایو ورزشی (اختیاری)</p>
          <label className="flex items-center justify-between gap-4 bg-zinc-900/70 border border-dashed border-zinc-600 rounded-2xl px-4 py-3 cursor-pointer hover:border-emerald-400">
            <input type="file" className="hidden" onChange={(e)=> setFileName(e.target.files?.[0]?.name || "") }/>
            <span className="text-zinc-300 text-sm">{fileName || "برای آپلود کلیک کنید"}</span>
            <span className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs">انتخاب فایل</span>
          </label>
        </div>
        <div className="md:col-span-2">
          <button onClick={()=> alert("سفارش شما ثبت شد. پس از پرداخت، برنامه در داشبوردتان نمایش داده می‌شود.") } className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg">
            ثبت و ادامه به پرداخت
          </button>
          {selected && (
            <p className="text-xs text-zinc-400 mt-2">پکیج انتخابی شما: {selected}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FitnessSite() {
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [selected, setSelected] = useState<string | null>(null);

  const pricing = useMemo(
    () => [
      {
        title: "فقط برنامه تمرینی",
        price: prices.training,
        features: [
          "پلان هفتگی بر اساس سطح شما",
          "ست، تکرار و استراحت دقیق",
          "ویدئو/انیمیشن اجرای حرکات",
        ],
        key: "training",
      },
      {
        title: "فقط برنامه تغذیه",
        price: prices.nutrition,
        features: [
          "کالری و ماکروهای دقیق",
          "تعویض‌پذیری آیتم‌ها",
          "سازگار با محدودیت‌های غذایی",
        ],
        key: "nutrition",
      },
      {
        title: "فقط مکملِ مجاز",
        price: prices.supplements,
        features: [
          "صرفاً مکمل‌های ایمن و قانونی",
          "دوز مصرفی پیشنهادی",
          "تداخل‌ها و هشدارهای مهم",
        ],
        key: "supplements",
      },
      {
        title: "پکیج کامل (۳ در ۱)",
        price: prices.bundle,
        features: [
          "تمرین + تغذیه + مکمل",
          "پشتیبانی پیامکی ۷ روزه",
          "به‌روزرسانی یک‌باره رایگان",
        ],
        key: "bundle",
      },
    ],
    [prices]
  );

  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* نوار بالایی */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-8 rounded-xl bg-emerald-500" />
            <strong className="text-lg">آکادمی بدن‌سازی امیر</strong>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a href="#services" className="hover:text-white">خدمات</a>
            <a href="#pricing" className="hover:text-white">تعرفه‌ها</a>
            <a href="#order" className="hover:text-white">ثبت سفارش</a>
            <a href="#contact" className="hover:text-white">تماس</a>
          </nav>
          <a href="#order" className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold">شروع کن</a>
        </div>
      </header>

      {/* هِرو با دو ویدئو (زن/مرد) */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              بدنت را بساز؛ زندگی‌ات را متحول کن
            </motion.h1>
            <p className="text-zinc-300 mb-6">
              برنامه‌های ۱۰۰٪ شخصی‌سازی‌شده برای هر سن، هر جنسیت و هر سطح. با آموزش تصویری حرکات، تغذیه علمی و مکمل‌های ایمن.
            </p>
            <div className="flex items-center gap-3">
              <a href="#pricing" className="px-5 py-3 rounded-2xl bg-emerald-500 text-black font-bold">مشاهده تعرفه‌ها</a>
              <a href="#services" className="px-5 py-3 rounded-2xl bg-zinc-800 text-zinc-100 font-bold">خدمات ما</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-zinc-700 shadow-lg">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop">
                <source src="https://cdn.coverr.co/videos/coverr-man-lifting-heavy-dumbbells-1881/1080p.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded-lg">ورزشکار مرد</span>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-zinc-700 shadow-lg">
              <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop">
                <source src="https://cdn.coverr.co/videos/coverr-woman-doing-squats-5290/1080p.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-2 right-2 text-xs bg-black/60 px-2 py-1 rounded-lg">ورزشکار زن</span>
            </div>
          </div>
        </div>
      </section>

      {/* خدمات */}
      <section id="services" className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8">خدمات اختصاصی ما</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <motion.div key={s.title} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="rounded-2xl bg-zinc-900/70 p-5 ring-1 ring-zinc-700">
              <div className="text-emerald-400 mb-3">{s.icon}</div>
              <h3 className="font-bold text-zinc-100 mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-300 leading-6">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* نظرات */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg-zinc-900/60 ring-1 ring-zinc-700 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">نظر کاربران</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-zinc-300">
            <p>«فقط با دو ماه برنامه تمرینی و تغذیه، ۷ کیلو چربی کم کردم. ویدئوهای آموزشی عالی بودن.» — سارا م.</p>
            <p>«حرکات به‌صورت مرحله‌به‌مرحله توضیح داده شده بود و نتیجه گرفتم. ممنون از تیم حرفه‌ای.» — امیر ف.</p>
            <p>«پکیج کامل گرفتم؛ پشتیبانی هم عالی بود. پیشنهاد می‌کنم.» — حمیدرضا ک.</p>
          </div>
        </div>
      </section>

      {/* تعرفه‌ها */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">تعرفه‌ها</h2>
          <details className="text-xs text-zinc-400">
            <summary className="cursor-pointer">تغییر قیمت توسط مدیر</summary>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(prices).map(([k, v]) => (
                <label key={k} className="bg-zinc-900/60 border border-zinc-700 rounded-xl px-2 py-1 flex items-center gap-2">
                  <span className="text-zinc-300 text-xs">{k}</span>
                  <input
                    type="number"
                    defaultValue={v}
                    onChange={(e)=> setPrices((p:any)=> ({...p, [k]: parseInt(e.target.value || "0", 10)}))}
                    className="w-full bg-transparent text-right text-zinc-100 focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </details>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricing.map((p) => (
            <PriceCard
              key={p.title}
              title={p.title}
              price={p.price}
              features={p.features}
              onSelect={()=> { setSelected(p.title); document.querySelector('#order')?.scrollIntoView({behavior:'smooth'}); }}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-4">* در خرید سوم توسط همان کاربر، مبلغ هر پکیج دو برابر می‌شود (قابل پیاده‌سازی در بک‌اند).</p>
      </section>

      {/* فرم سفارش */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <OrderForm selected={selected} />
      </section>

      {/* فوتر */}
      <footer id="contact" className="border-t border-zinc-800 py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm text-zinc-300">
          <div>
            <h4 className="font-bold text-zinc-100 mb-2">درباره ما</h4>
            <p>بیش از ۳۰ سال تجربه در تمرین، مربی‌گری و آماده‌سازی مسابقات. اینجا، مسیر درست را سریع‌تر می‌روید.</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 mb-2">ارتباط</h4>
            <p>ایمیل: info@example.com</p>
            <p>اینستاگرام: @amirfitness</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 mb-2">قوانین مهم</h4>
            <p>ارائه هرگونه داروی غیرقانونی یا خطرناک ممکن نیست. فقط راهکارهای ایمن و مبتنی بر علم ارائه می‌شود.</p>
          </div>
        </div>
        <div className="text-center text-xs text-zinc-500 mt-8">© {new Date().getFullYear()} آکادمی بدن‌سازی امیر – همه حقوق محفوظ است.</div>
      </footer>
    </div>
  );
}
