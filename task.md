# فاز ۱: Todo پیشرفته (هسته‌ی مفاهیم)

**هدف‌ها:** ترکیب `useReducer`, `useContext`, `useEffect`, `useRef`, الگوی state → UI، و نگه‌داری در localStorage.

## جلسه 1 — راه‌اندازی و اسکلت

- خروجی نهایی: لیست کارها + فرم افزودن.
- تمرین‌ها:

  - ساختار پروژه (components: `App`, `TodoForm`, `TodoList`, `TodoItem`).
  - `useReducer` برای state تسک‌ها (`todos`, `filter`).
  - اکشن‌ها: `ADD_TODO`, `TOGGLE_TODO`, `EDIT_TODO`, `REMOVE_TODO`, `SET_FILTER`.

- چالش خانگی: اعتبارسنجی ساده‌ی ورودی و جلوگیری از آیتم خالی.

## جلسه 2 — Context + Ref + Persist

- خروجی نهایی: تم روشن/تاریک و persist شدن داده‌ها.
- تمرین‌ها:

  - `ThemeContext` با `useContext` (toggle theme).
  - `useRef` برای فوکوس خودکار روی input بعد از افزودن.
  - `useEffect` برای sync با `localStorage` (load-once + save-on-change).

- چالش خانگی: debounce ذخیره‌سازی (با `setTimeout` در `useEffect` و cleanup).

## جلسه 3 — فیلتر/جست‌وجو + UX

- خروجی نهایی: فیلتر (All / Active / Done) + جست‌وجو.
- تمرین‌ها:

  - memoization سبک (به‌کمک مشتق‌سازی state در reducer یا محاسبه‌ی مشتق‌شده داخل کامپوننت).
  - اسکرول نرم به آیتم ویرایش‌شده با `useRef`.

- چالش خانگی: انیمیشن ورود/خروج آیتم‌ها (CSS-transitions کافی است).

**معیار قبولی فاز ۱**

- CRUD کامل، تم، persist، جست‌وجو/فیلتر، UX مناسب، عدم هشدارهای React در کنسول.

# فاز ۲: Shopping Cart کوچک (state اشتراکی و بیزنسی)

**هدف‌ها:** مدل‌سازی داده، جمع‌های مشتق‌شده، side-effectهای وابسته به state، معماری ماژولار.

## جلسه 4 — کاتالوگ + سبد (Reducer پیشرفته)

- خروجی نهایی: لیست محصولات، افزودن به سبد.
- تمرین‌ها:

  - `CartContext` + `useReducer` جدا.
  - اکشن‌ها: `ADD_ITEM`, `REMOVE_ITEM`, `CHANGE_QTY`, `CLEAR_CART`.
  - محاسبه‌ی `subtotal`, `itemsCount` به صورت مشتق از state.

- چالش خانگی: جلوگیری از اضافه‌شدن آیتم تکراری (merge بر اساس `id`).

## جلسه 5 — افکت‌ها و همگام‌سازی

- خروجی نهایی: حفظ سبد بین رفرش‌ها + شبیه‌سازی API.
- تمرین‌ها:

  - `useEffect` برای sync با `localStorage`.
  - شبیه‌سازی fetch محصولات با `setTimeout` (loading/error states).
  - اسکرول به Checkout با `useRef`.

- چالش خانگی: کوپن تخفیف (valid/invalid) و محاسبه‌ی total.

**معیار قبولی فاز ۲**

- سبد خرید پایدار، محاسبات درست، مدیریت خطا/لودینگ، حداقل یک تست دستی از سناریوهای مهم (افزودن/حذف/تغییر تعداد).

# فاز ۳: Quiz App (کنترل جریان، تایمر، reset)

**هدف‌ها:** کنترل جریان چندمرحله‌ای، تایمر با cleanup، مدیریت نمره در Context.

## جلسه 6 — ماشین حالات سبک با Reducer

- خروجی نهایی: نمایش سوالات مرحله‌ای.
- تمرین‌ها:

  - state: `{currentIndex, answers, score, status: 'idle'|'running'|'finished', timeLeft}`.
  - اکشن‌ها: `START`, `ANSWER`, `NEXT`, `FINISH`, `TICK`, `RESET`.

- چالش خانگی: دکمه‌ی «پرش و برگشت» (navigate بین سوال‌ها).

## جلسه 7 — تایمر و افکت‌های دقیق

- خروجی نهایی: تایمر هر سوال + پایان خودکار.
- تمرین‌ها:

  - `useEffect` برای `setInterval` و **cleanup** صحیح.
  - استفاده از `useRef` برای نگه‌داشتن `intervalId` یا فوکوس گزینه‌ی انتخاب‌شده.

- چالش خانگی: نمایش گزارش نهایی (درصد، زمان صرف‌شده، پاسخ‌های درست/نادرست).

**معیار قبولی فاز ۳**

- جریان کامل شروع→پاسخ→پایان، تایمر با cleanup بدون memory leak، reset تمیز.

# فاز ۴: جمع‌بندی حرفه‌ای (بهبود کیفیت)

## جلسه 8 — ساختار، الگوها و تست سبک

- خروجی نهایی: رفرکتور + پایداری.
- تمرین‌ها:

  - الگوی `Context + Reducer` (co-locate کردن reducer و actions).
  - استخراج custom hooks کوچک: `useLocalStorage(key, initial)`, `useToggle(initial)`.
  - تست ذهنی/چک‌لیست: سناریوهای بحرانی هر پروژه.

- چالش خانگی: افزودن A11y پایه (role/aria-label، focus outline).

## جلسه 9 — بهینه‌سازی رندر

- تمرین‌ها:

  - `React.memo` برای لیست‌ها، `useCallback` برای هندلرهای پایدار، `useMemo` برای محاسبات سنگین مشتق‌شده.
  - اندازه‌گیری با `performance.mark` ساده یا React profiler (معرفی مفهومی).

- چالش خانگی: گزارش قبل/بعد از بهینه‌سازی (توضیح کوتاه).

## جلسه 10 — دیپلوی و مستندسازی

- تمرین‌ها:

  - تنظیم اسکریپت build، دیپلوی روی Vercel/Netlify (در کلاس دمو).
  - README با اسکرین‌شات، دستور اجرا، ویژگی‌ها، مسیرهای توسعه آینده.

- چالش خانگی: ساخت یک **feature branch** و PR تمرینی (ریویو همکلاسی).

---

# تقسیم کار هر پروژه

- **روز اول:** طراحی state و اکشن‌ها (قبل از کدنویسی UI).
- **روز دوم:** پیاده‌سازی مینیمال و جریان اصلی.
- **روز سوم:** افکت‌ها، persist، refها.
- **روز چهارم:** polish: UX، خطا، لودینگ، تم.

# ساختار پیشنهادی پوشه‌ها

```
src/
  components/
  contexts/
  reducers/
  hooks/        // useLocalStorage, ...
  pages/        // اگر روتینگ اضافه کردید
  utils/
  styles/
```

# چک‌لیست ارزیابی (روشن و عملی)

- Reducerها pure و بدون side-effect.
- Context فقط داده/dispatch لازم را expose کند (نه کل state بی‌هدف).
- Effectها dependency درست + cleanup دارند.
- Refها فقط برای موارد غیرقابل‌کنترل (focus/DOM handle) استفاده شده.
- State مشتق‌شده با memo یا محاسبه‌ی به‌جا (نه ذخیره‌ی اضافی).
- هیچ هشدار React در کنسول.
- قابلیت بازیابی بعد از رفرش (جایی که لازم است).
- README شفاف.

---

اگر بخوای، می‌تونم برای **جلسه ۱**، طرح reducer و type اکشن‌ها و اسکلت کامپوننت‌ها رو هم همینجا بنویسم تا باهاشون کلاس رو استارت بزنی.
