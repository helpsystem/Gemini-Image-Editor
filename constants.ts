
import { Prompt, PromptCategory } from './types';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    name: 'Filters & Color',
    prompts: [
      { id: 'cinematic_teal_orange', english: 'Apply a cinematic teal and orange color grade', persian: 'اعمال فیلتر رنگی سینمایی (آبی و نارنجی)' },
      { id: 'moody_dark', english: 'Create a moody, dark, and atmospheric tone', persian: 'ایجاد تم تیره و اتمسفریک' },
      { id: 'vibrant', english: 'Boost colors to be more vibrant and saturated', persian: 'افزایش شادابی و اشباع رنگ‌ها' },
      { id: 'pastel_dream', english: 'Transform colors to a soft, pastel dream-like palette', persian: 'تبدیل به پالت رنگی پاستلی و رویایی' },
      { id: 'sepia', english: 'Apply a classic sepia tone filter', persian: 'اعمال فیلتر کلاسیک سپیا' },
      { id: 'faded_film', english: 'Give the image a faded, vintage film look', persian: 'ایجاد ظاهر فیلم قدیمی و رنگ‌پریده' },
      { id: 'bw_dramatic', english: 'Convert to a high-contrast, dramatic black and white', persian: 'تبدیل به سیاه و سفید دراماتیک با کنتراست بالا' },
    ],
  },
  {
    name: 'Lighting Effects',
    prompts: [
      { id: 'golden_hour', english: 'Add a warm, golden hour glow', persian: 'افزودن درخشش گرم ساعت طلایی' },
      { id: 'studio_lighting', english: 'Apply dramatic, professional studio lighting', persian: 'اعمال نورپردازی استودیویی حرفه‌ای و دراماتیک' },
      { id: 'soft_backlight', english: 'Introduce a soft backlight to create a halo effect', persian: 'ایجاد نور پس‌زمینه نرم (افکت هاله)' },
      { id: 'neon_noir', english: 'Give it a neon-noir aesthetic with pink and blue lights', persian: 'ایجاد زیبایی‌شناسی نئون-نوآر با نورهای صورتی و آبی' },
      { id: 'rim_lighting', english: 'Add rim lighting to outline the subject', persian: 'افزودن نور حاشیه‌ای برای برجسته‌سازی سوژه' },
    ],
  },
  {
    name: 'Artistic Styles',
    prompts: [
      { id: 'watercolor', english: 'Transform into a watercolor painting', persian: 'تبدیل به نقاشی آبرنگ' },
      { id: 'oil_painting', english: 'Transform into a classic oil painting', persian: 'تبدیل به نقاشی رنگ روغن کلاسیک' },
      { id: 'sketch', english: 'Convert the image to a pencil sketch', persian: 'تبدیل به طراحی با مداد' },
      { id: 'comic_book', english: 'Apply a comic book art style', persian: 'اعمال استایل کتاب کمیک' },
      { id: 'impressionist', english: 'Give it an impressionist painting style', persian: 'ایجاد استایل نقاشی امپرسیونیستی' },
      { id: 'pop_art', english: 'Reimagine the image in a pop art style', persian: 'بازآفرینی به سبک پاپ آرت' },
    ],
  },
  {
    name: 'Fixes & Enhancements',
    prompts: [
        { id: 'enhance_details', english: 'Increase sharpness and enhance fine details', persian: 'افزایش وضوح و بهبود جزئیات' },
        { id: 'remove_noise', english: 'Reduce image noise and grain', persian: 'کاهش نویز و گرین تصویر' },
        { id: 'color_correct', english: 'Automatically correct the color balance', persian: 'اصلاح خودکار توازن رنگ' },
        { id: 'improve_composition', english: 'Improve the composition by cropping and reframing', persian: 'بهبود ترکیب‌بندی با کراپ و قاب‌بندی مجدد' },
        { id: 'add_vignette', english: 'Add a subtle, dark vignette around the edges', persian: 'افزودن وینیت تیره و ملایم در لبه‌ها' },
        { id: 'remove_background', english: 'Remove the background, keeping only the main subject', persian: 'حذف پس‌زمینه' },
    ],
  }
];

export const ANALYZE_PROMPT: Prompt = {
  id: 'analyze',
  english: 'Analyze this image and apply professional-grade edits to enhance its quality for use on a website or social media profile. Improve lighting, color balance, and overall composition.',
  persian: 'این عکس را آنالیز کن و بهترین ادیت را برای استفاده در وبسایت یا پروفایل اعمال کن'
};
