import { addLocale, useLocale } from "c-3po";
import { I18NApi } from "metabase/services";

export async function loadLocalization(locale) {
  // load and parse the locale
  const translationsObject = await I18NApi.locale({ locale });
  setLocalization(translationsObject);
}

export function setLocalization(translationsObject) {
  const locale = translationsObject.headers.language;

  addMsgIds(translationsObject);

  // add and set locale with C-3PO
  addLocale(locale, translationsObject);
  useLocale(locale);

  // d3 TR locale
  if (locale.toLowerCase() === 'tr') {
    window['d3_locale_TR'] = {
      decimal: ",",
      thousands: ".",
      grouping: [3],
      currency: ["", " ₺"],
      dateTime: "%A %B %e, %Y %X",
      date: "%d.%m.%Y",
      time: "%H:%M:%S",
      periods: ["ÖÖ", "ÖS"], // unused
      days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      shortDays: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      shortMonths: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]
    }
  }
}

// we delete msgid property since it's redundant, but have to add it back in to
// make c-3po happy
function addMsgIds(translationsObject) {
  const msgs = translationsObject.translations[""];
  for (const msgid in msgs) {
    if (msgs[msgid].msgid === undefined) {
      msgs[msgid].msgid = msgid;
    }
  }
}
