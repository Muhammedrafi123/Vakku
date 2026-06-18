export type Lang = "en" | "ml";

const translations = {
  en: {
    // Nav
    nav_home: "Home",
    nav_promises: "Promises",
    nav_categories: "Categories",
    nav_ministers: "Ministers",
    nav_timeline: "Timeline",
    nav_more: "More",

    // Hero
    hero_badge: "UDF GOVERNMENT OF KERALA",
    hero_sub: "Tracking Every Promise Made by UDF to the People of Kerala",

    // Stat cards
    stat_total: "Total Promises",
    stat_total_detail: "Made to the people of Kerala",
    stat_fulfilled: "Fulfilled",
    stat_fulfilled_detail: "Promises delivered",
    stat_inprogress: "In Progress",
    stat_inprogress_detail: "Acted upon so far",
    stat_notstarted: "Not Started",
    stat_notstarted_detail: "Still waiting to begin",

    // Progress section
    progress_acted: "of promises acted upon in",
    progress_days: "days in office",
    progress_fulfilled: "fulfilled",
    progress_active: "active",
    progress_waiting: "waiting",

    // Navigate section
    explore_label: "Explore",
    nav_tile_promises_unit: "promises",
    nav_tile_promises_title: "Browse all promises",
    nav_tile_promises_desc: "Search and filter every manifesto commitment by sector, status, or importance",
    nav_tile_categories_unit: "sectors",
    nav_tile_categories_title: "Promise areas",
    nav_tile_categories_desc: "See how each sector of governance — health, education, jobs — tracks over time",
    nav_tile_timeline_unit: "updates",
    nav_tile_timeline_title: "Evidence timeline",
    nav_tile_timeline_desc: "Every recorded government action, GO, budget allocation, and news update",

    // Recent updates
    updates_eyebrow: "Latest evidence",
    updates_title: "Recently updated",
    updates_viewall: "Full timeline →",
    updates_fallback: "Update recorded",

    // Stats section
    stats_eyebrow: "Statistics",
    stats_title: "By the numbers",
    donut_title: "Promises by status",
    donut_total: "Total",
    legend_fulfilled: "Fulfilled",
    legend_active: "Active",
    legend_waiting: "Waiting",
    cats_title: "Top promise areas",
    cats_viewall: "All sectors →",

    // Promise explorer
    pe_label: "Promise explorer",
    pe_title_1: "Every promise,",
    pe_title_em: "tracked.",
    pe_kpi_total: "Total promises",
    pe_kpi_fulfilled: "Fulfilled",
    pe_kpi_inmotion: "In motion",
    pe_kpi_rate: "Fulfillment rate",
    pe_tab_all: "All",
    pe_tab_started: "Started",
    pe_tab_highimpact: "High impact",
    pe_tab_women: "Women",
    pe_tab_students: "Students",
    pe_tab_jobs: "Jobs",
    pe_tab_health: "Health",
    pe_tab_deadlines: "Deadlines",
    pe_search_placeholder: "Search pension, KSRTC, jobs, health…",
    pe_filters: "Filters",
    pe_filter_category: "Category",
    pe_filter_status: "Status",
    pe_filter_importance: "Importance",
    pe_filter_sort: "Sort by",
    pe_all_categories: "All categories",
    pe_all_statuses: "All statuses",
    pe_any_importance: "Any importance",
    pe_sort_id: "Promise ID",
    pe_sort_page: "Source page",
    pe_sort_importance: "Importance",
    pe_sort_progress_desc: "Progress ↓",
    pe_sort_progress_asc: "Progress ↑",
    pe_promise: "promise",
    pe_promises: "promises",
    pe_of: "of",
    pe_total: "total",
    pe_page: "page",
    pe_no_results: "No promises match these filters.",
    pe_clear: "Clear all filters",
    pe_loading: "Loading promises…",

    // Promise card
    pc_progress: "Progress",
    pc_high_impact: "High impact",
    pc_deadline: "Deadline",

    // Status labels
    status_not_started: "Not Started",
    status_announced: "Announced",
    status_in_progress: "In Progress",
    status_partial: "Partial",
    status_fulfilled: "Fulfilled",
    status_delayed: "Delayed",
    status_abandoned: "Abandoned",

    // Importance
    imp_high: "High",
    imp_medium: "Medium",
    imp_low: "Low",

    // Header / Nav
    header_explore: "Explore Promises",
    nav_about: "About",
    nav_timeline_label: "Timeline",

    // Footer
    footer_desc: "A public-interest civic tracker built from manifesto source pages.",
    footer_dataset: "Dataset",
    footer_extracted: "promises extracted",
    footer_editorial: "Editorial policy",
    footer_timeline: "Update timeline",
    footer_browse: "Browse all promises",

    // Days counter
    dc_label: "UDF in power for",
    dc_unit: "days",
    dc_since: "Since May 18, 2026",

    // Promise detail
    pd_back: "Back to Promises",
    pd_completed: "completed",
    pd_overall_progress: "Overall Progress",
    pd_promise_details: "Promise Details",
    pd_category: "Category",
    pd_department: "Department",
    pd_minister: "Minister",
    pd_manifesto_page: "Manifesto page",
    pd_importance: "Importance",
    pd_promise_id: "Promise ID",
    pd_deadline: "Deadline",
    pd_about: "About This Promise",
    pd_what_means: "What this means",
    pd_why_matters: "Why it matters",
    pd_if_unfulfilled: "If unfulfilled",
    pd_evidence: "Evidence Timeline",
    pd_entries: "entries",
    pd_last_updated: "Last updated:",
    pd_no_updates: "No updates recorded yet",
    pd_no_updates_sub: "Updates will appear here as this promise moves through government processes.",
    pd_typical: "Typical milestone pattern",
    pd_more_category: "More in this category",
    pd_source: "Source",

    // Language overlay
    overlay_choose: "Choose your language",
    overlay_sub: "Select how you'd like to browse the tracker",
    overlay_en: "English",
    overlay_ml: "മലയാളം",
    overlay_en_desc: "Browse in English",
    overlay_ml_desc: "മലയാളത്തിൽ കാണുക",
    overlay_continue: "Continue",
  },

  ml: {
    // Nav
    nav_home: "ഹോം",
    nav_promises: "വാഗ്ദാനങ്ങൾ",
    nav_categories: "വിഭാഗങ്ങൾ",
    nav_ministers: "മന്ത്രിമാർ",
    nav_timeline: "ടൈംലൈൻ",
    nav_more: "കൂടുതൽ",

    // Hero
    hero_badge: "കേരളത്തിലെ യുഡിഎഫ് സർക്കാർ",
    hero_sub: "കേരള ജനതയ്ക്ക് നൽകിയ എല്ലാ വാഗ്ദാനങ്ങളും ട്രാക്ക് ചെയ്യുന്നു",

    // Stat cards
    stat_total: "ആകെ വാഗ്ദാനങ്ങൾ",
    stat_total_detail: "കേരള ജനതയ്ക്ക് നൽകിയത്",
    stat_fulfilled: "നിറവേറ്റിയത്",
    stat_fulfilled_detail: "പൂർത്തിയാക്കിയ വാഗ്ദാനങ്ങൾ",
    stat_inprogress: "പുരോഗതിയിൽ",
    stat_inprogress_detail: "ഇതുവരെ നടപടി സ്വീകരിച്ചത്",
    stat_notstarted: "ആരംഭിച്ചിട്ടില്ല",
    stat_notstarted_detail: "ഇനിയും കാത്തിരിക്കുന്നത്",

    // Progress section
    progress_acted: "വാഗ്ദാനങ്ങൾ നടപടിയിൽ, ഓഫീസിൽ",
    progress_days: "ദിവസം",
    progress_fulfilled: "നിറവേറ്റിയത്",
    progress_active: "സജീവം",
    progress_waiting: "കാത്തിരിക്കുന്നത്",

    // Navigate section
    explore_label: "പര്യവേക്ഷണം ചെയ്യുക",
    nav_tile_promises_unit: "വാഗ്ദാനങ്ങൾ",
    nav_tile_promises_title: "എല്ലാ വാഗ്ദാനങ്ങളും കാണുക",
    nav_tile_promises_desc: "മേഖല, പദവി, പ്രാധാന്യം അനുസരിച്ച് തിരയുക",
    nav_tile_categories_unit: "മേഖലകൾ",
    nav_tile_categories_title: "വാഗ്ദാന മേഖലകൾ",
    nav_tile_categories_desc: "ആരോഗ്യം, വിദ്യാഭ്യാസം, തൊഴിൽ — ഓരോ ഭരണ മേഖലയും ട്രാക്ക് ചെയ്യുക",
    nav_tile_timeline_unit: "അപ്ഡേറ്റുകൾ",
    nav_tile_timeline_title: "തെളിവ് ടൈംലൈൻ",
    nav_tile_timeline_desc: "രേഖപ്പെടുത്തിയ ഓരോ സർക്കാർ നടപടിയും, GO, ബജറ്റ് വകയിരുത്തലും",

    // Recent updates
    updates_eyebrow: "ഏറ്റവും പുതിയ തെളിവ്",
    updates_title: "അടുത്തിടെ അപ്ഡേറ്റ് ചെയ്തത്",
    updates_viewall: "പൂർണ ടൈംലൈൻ →",
    updates_fallback: "അപ്ഡേറ്റ് രേഖപ്പെടുത്തി",

    // Stats section
    stats_eyebrow: "സ്ഥിതിവിവരക്കണക്കുകൾ",
    stats_title: "സംഖ്യകളിൽ",
    donut_title: "പദവി അനുസരിച്ച് വാഗ്ദാനങ്ങൾ",
    donut_total: "ആകെ",
    legend_fulfilled: "നിറവേറ്റിയത്",
    legend_active: "സജീവം",
    legend_waiting: "കാത്തിരിക്കുന്നത്",
    cats_title: "മുൻനിര വാഗ്ദാന മേഖലകൾ",
    cats_viewall: "എല്ലാ മേഖലകളും →",

    // Promise explorer
    pe_label: "വാഗ്ദാന എക്സ്പ്ലോറർ",
    pe_title_1: "ഓരോ വാഗ്ദാനവും,",
    pe_title_em: "ട്രാക്ക് ചെയ്തത്.",
    pe_kpi_total: "ആകെ വാഗ്ദാനങ്ങൾ",
    pe_kpi_fulfilled: "നിറവേറ്റിയത്",
    pe_kpi_inmotion: "നടന്നുകൊണ്ടിരിക്കുന്നത്",
    pe_kpi_rate: "പൂർത്തീകരണ നിരക്ക്",
    pe_tab_all: "എല്ലാം",
    pe_tab_started: "ആരംഭിച്ചത്",
    pe_tab_highimpact: "ഉയർന്ന പ്രഭാവം",
    pe_tab_women: "സ്ത്രീകൾ",
    pe_tab_students: "വിദ്യാർഥികൾ",
    pe_tab_jobs: "തൊഴിൽ",
    pe_tab_health: "ആരോഗ്യം",
    pe_tab_deadlines: "സമയപരിധി",
    pe_search_placeholder: "പെൻഷൻ, കെഎസ്ആർടിസി, തൊഴിൽ, ആരോഗ്യം…",
    pe_filters: "ഫിൽട്ടറുകൾ",
    pe_filter_category: "വിഭാഗം",
    pe_filter_status: "പദവി",
    pe_filter_importance: "പ്രാധാന്യം",
    pe_filter_sort: "അടുക്കുക",
    pe_all_categories: "എല്ലാ വിഭാഗങ്ങളും",
    pe_all_statuses: "എല്ലാ പദവികളും",
    pe_any_importance: "ഏതു പ്രാധാന്യവും",
    pe_sort_id: "വാഗ്ദാന ID",
    pe_sort_page: "ഉറവിട പേജ്",
    pe_sort_importance: "പ്രാധാന്യം",
    pe_sort_progress_desc: "പുരോഗതി ↓",
    pe_sort_progress_asc: "പുരോഗതി ↑",
    pe_promise: "വാഗ്ദാനം",
    pe_promises: "വാഗ്ദാനങ്ങൾ",
    pe_of: "ൽ നിന്ന്",
    pe_total: "ആകെ",
    pe_page: "പേജ്",
    pe_no_results: "ഈ ഫിൽട്ടറുകൾക്ക് യോജിക്കുന്ന വാഗ്ദാനങ്ങളൊന്നുമില്ല.",
    pe_clear: "എല്ലാ ഫിൽട്ടറുകളും മായ്ക്കുക",
    pe_loading: "വാഗ്ദാനങ്ങൾ ലോഡ് ചെയ്യുന്നു…",

    // Promise card
    pc_progress: "പുരോഗതി",
    pc_high_impact: "ഉയർന്ന പ്രഭാവം",
    pc_deadline: "സമയപരിധി",

    // Status labels
    status_not_started: "ആരംഭിച്ചിട്ടില്ല",
    status_announced: "പ്രഖ്യാപിച്ചു",
    status_in_progress: "പുരോഗതിയിൽ",
    status_partial: "ഭാഗിക",
    status_fulfilled: "നിറവേറ്റിയത്",
    status_delayed: "വൈകിയത്",
    status_abandoned: "ഉപേക്ഷിച്ചത്",

    // Importance
    imp_high: "ഉയർന്നത്",
    imp_medium: "ഇടത്തരം",
    imp_low: "താഴ്ന്നത്",

    // Header / Nav
    header_explore: "വാഗ്ദാനങ്ങൾ കാണുക",
    nav_about: "ഞങ്ങളെ കുറിച്ച്",
    nav_timeline_label: "ടൈംലൈൻ",

    // Footer
    footer_desc: "മാനിഫെസ്റ്റോ ഉറവിട പേജുകളിൽ നിന്ന് നിർമ്മിച്ച ഒരു പൊതുതാൽപ്പര്യ ട്രാക്കർ.",
    footer_dataset: "ഡേറ്റാസെറ്റ്",
    footer_extracted: "വാഗ്ദാനങ്ങൾ ശേഖരിച്ചത്",
    footer_editorial: "എഡിറ്റോറിയൽ നയം",
    footer_timeline: "ടൈംലൈൻ അപ്ഡേറ്റ്",
    footer_browse: "എല്ലാ വാഗ്ദാനങ്ങളും കാണുക",

    // Days counter
    dc_label: "യുഡിഎഫ് അധികാരത്തിൽ",
    dc_unit: "ദിവസം",
    dc_since: "2026 മേയ് 18 മുതൽ",

    // Promise detail
    pd_back: "വാഗ്ദാനങ്ങളിലേക്ക്",
    pd_completed: "പൂർത്തിയായി",
    pd_overall_progress: "ആകെ പുരോഗതി",
    pd_promise_details: "വാഗ്ദാന വിശദാംശങ്ങൾ",
    pd_category: "വിഭാഗം",
    pd_department: "വകുപ്പ്",
    pd_minister: "മന്ത്രി",
    pd_manifesto_page: "മാനിഫെസ്റ്റോ പേജ്",
    pd_importance: "പ്രാധാന്യം",
    pd_promise_id: "വാഗ്ദാന ID",
    pd_deadline: "സമയപരിധി",
    pd_about: "ഈ വാഗ്ദാനത്തെ കുറിച്ച്",
    pd_what_means: "ഇതിന്റെ അർഥം",
    pd_why_matters: "ഇത് പ്രധാനമായ കാരണം",
    pd_if_unfulfilled: "നിറവേറ്റിയില്ലെങ്കിൽ",
    pd_evidence: "തെളിവ് ടൈംലൈൻ",
    pd_entries: "എൻട്രികൾ",
    pd_last_updated: "അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:",
    pd_no_updates: "ഇതുവരെ അപ്ഡേറ്റുകളൊന്നുമില്ല",
    pd_no_updates_sub: "ഈ വാഗ്ദാനം സർക്കാർ പ്രക്രിയകളിലൂടെ നീങ്ങുമ്പോൾ അപ്ഡേറ്റുകൾ ഇവിടെ ദൃശ്യമാകും.",
    pd_typical: "സാധാരണ മൈൽസ്റ്റോൺ ക്രമം",
    pd_more_category: "ഈ വിഭാഗത്തിൽ കൂടുതൽ",
    pd_source: "ഉറവിടം",

    // Language overlay
    overlay_choose: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    overlay_sub: "ട്രാക്കർ ബ്രൗസ് ചെയ്യാൻ ഭാഷ തിരഞ്ഞെടുക്കുക",
    overlay_en: "English",
    overlay_ml: "മലയാളം",
    overlay_en_desc: "Browse in English",
    overlay_ml_desc: "മലയാളത്തിൽ കാണുക",
    overlay_continue: "തുടരുക",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations.en[key];
}

const statusKeyMap: Record<string, TranslationKey> = {
  fulfilled:   "status_fulfilled",
  in_progress: "status_in_progress",
  announced:   "status_announced",
  partial:     "status_partial",
  not_started: "status_not_started",
  delayed:     "status_delayed",
  abandoned:   "status_abandoned",
};

export function statusLabel(lang: Lang, status: string): string {
  const key = statusKeyMap[status];
  return key ? t(lang, key) : status;
}
