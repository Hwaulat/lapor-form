export type FormType = "bos_v2" | "bos_v3" | "nearmiss" | "qrp" | "kondisi_tidak_aman";

export interface FieldOption {
  value: string;
  labelId: string;
  labelEn: string;
}

export interface FormField {
  id: string;
  labelId: string;
  labelEn: string;
  type: "radio" | "text" | "date" | "dropdown" | "textarea" | "number";
  options?: FieldOption[];
  maxLength?: number;
  required?: boolean;
}

export interface FormStep {
  id: string;
  titleId: string;
  titleEn: string;
  fields: FormField[];
}

export interface FormConfig {
  id: FormType;
  nameId: string;
  nameEn: string;
  icon: string;
  color: string;
  bgColor: string;
  steps: FormStep[];
}

const SHIFT_OPTIONS: FieldOption[] = [
  { value: "shift1", labelId: "Shift 1", labelEn: "Shift 1" },
  { value: "shift2", labelId: "Shift 2", labelEn: "Shift 2" },
  { value: "shift3", labelId: "Shift 3", labelEn: "Shift 3" },
];

const LOCATION_OPTIONS: FieldOption[] = [
  { value: "line1",        labelId: "Line 1",                     labelEn: "Line 1" },
  { value: "line2",        labelId: "Line 2",                     labelEn: "Line 2" },
  { value: "line3",        labelId: "Line 3",                     labelEn: "Line 3" },
  { value: "line4",        labelId: "Line 4",                     labelEn: "Line 4" },
  { value: "line5",        labelId: "Line 5",                     labelEn: "Line 5" },
  { value: "line6",        labelId: "Line 6",                     labelEn: "Line 6" },
  { value: "workshop",     labelId: "Workshop",                   labelEn: "Workshop" },
  { value: "wh_raw",       labelId: "Warehouse Raw Material",     labelEn: "Warehouse Raw Material" },
  { value: "wh_pkg",       labelId: "Warehouse Packaging Material", labelEn: "Warehouse Packaging Material" },
  { value: "wh_fg",        labelId: "Warehouse Finished Goods",   labelEn: "Warehouse Finished Goods" },
  { value: "office_atas",  labelId: "Office Atas",                labelEn: "Upper Office" },
  { value: "lab_quality",  labelId: "Laboratorium Quality",       labelEn: "Quality Laboratory" },
  { value: "office_rd",    labelId: "Office R&D",                 labelEn: "R&D Office" },
  { value: "fasilitas",    labelId: "Fasilitas Umum",             labelEn: "General Facilities" },
  { value: "area_luar",    labelId: "Area Luar",                  labelEn: "Outdoor Area" },
];

const LINE_AREA_OPTIONS: FieldOption[] = [
  { value: "flour_sugar", labelId: "Flour and Sugar Dump", labelEn: "Flour and Sugar Dump" },
  { value: "buhler",      labelId: "Buhler Guerin",        labelEn: "Buhler Guerin" },
  { value: "mixing",      labelId: "Mixing",               labelEn: "Mixing" },
  { value: "forming",     labelId: "Forming",              labelEn: "Forming" },
];

export const FORMS_CONFIG: FormConfig[] = [
  {
    id: "bos_v2",
    nameId: "Lapor Bos V2",
    nameEn: "Report BOS V2",
    icon: "👁️",
    color: "#F97316",
    bgColor: "#FFF7ED",
    steps: [
      {
        id: "observation",
        titleId: "Data Observasi",
        titleEn: "Observation Data",
        fields: [
          {
            id: "date",
            labelId: "Pada tanggal berapa anda melakukan observasi?",
            labelEn: "On what date did you conduct the observation?",
            type: "date",
            required: true,
          },
          {
            id: "shift",
            labelId: "Pada shift berapa anda melakukan observasi?",
            labelEn: "Which shift did you conduct the observation?",
            type: "dropdown",
            options: SHIFT_OPTIONS,
            required: true,
          },
          {
            id: "location",
            labelId: "Dimanakah anda melakukan observasi?",
            labelEn: "Where did you conduct the observation?",
            type: "dropdown",
            options: LOCATION_OPTIONS,
            required: true,
          },
          {
            id: "area",
            labelId: "Di area mana anda melakukan observasi? (Line Produksi)",
            labelEn: "Which production line area? (Production Line)",
            type: "dropdown",
            options: LINE_AREA_OPTIONS,
            required: true,
          },
        ],
      },
      {
        id: "findings",
        titleId: "Temuan Observasi",
        titleEn: "Observation Findings",
        fields: [
          {
            id: "fsdu1",
            labelId: "FSDU1 — Karyawan berjalan sambil menggunakan handphone",
            labelEn: "FSDU1 — Employee walking while using mobile phone",
            type: "number",
          },
          {
            id: "fsds1",
            labelId: "FSDS1 — Karyawan tidak berjalan sambil menggunakan handphone",
            labelEn: "FSDS1 — Employee not walking while using mobile phone",
            type: "number",
          },
          {
            id: "fsdu2",
            labelId: "FSDU2 — Karyawan memberdirikan/menyimpan pallet sembarangan",
            labelEn: "FSDU2 — Employee placing/storing pallets carelessly",
            type: "number",
          },
        ],
      },
    ],
  },
  {
    id: "bos_v3",
    nameId: "Lapor Bos V3",
    nameEn: "Report BOS V3",
    icon: "📋",
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    steps: [
      {
        id: "identity",
        titleId: "Data Observasi",
        titleEn: "Observation Data",
        fields: [
          {
            id: "date",
            labelId: "Pada tanggal berapa anda melakukan observasi?",
            labelEn: "On what date did you conduct the observation?",
            type: "date",
            required: true,
          },
          {
            id: "shift",
            labelId: "Pada shift berapa anda melakukan observasi?",
            labelEn: "Which shift did you conduct the observation?",
            type: "dropdown",
            options: SHIFT_OPTIONS,
            required: true,
          },
        ],
      },
      {
        id: "detail",
        titleId: "Detail Observasi",
        titleEn: "Observation Detail",
        fields: [
          {
            id: "location",
            labelId: "Dimanakah anda melakukan observasi?",
            labelEn: "Where did you conduct the observation?",
            type: "dropdown",
            options: LOCATION_OPTIONS,
            required: true,
          },
          {
            id: "description",
            labelId: "Jelaskan temuan observasi anda",
            labelEn: "Describe your observation findings",
            type: "textarea",
            maxLength: 500,
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: "nearmiss",
    nameId: "Lapor Nearmiss",
    nameEn: "Report Near-Miss",
    icon: "⚠️",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    steps: [
      {
        id: "incident",
        titleId: "Detail Kejadian Nearmiss",
        titleEn: "Near-Miss Incident Detail",
        fields: [
          {
            id: "person_involved",
            labelId: "Sebutkan nama, divisi, dan perusahaan dari personil yang hampir celaka",
            labelEn: "State the name, division, and company of the person who nearly had an accident",
            type: "dropdown",
            options: [
              { value: "Hasan - Maintenance", labelId: "Hasan - Maintenance", labelEn: "Hasan - Maintenance" },
              { value: "Lainnya", labelId: "Lainnya", labelEn: "Others" },
            ],
            required: true,
          },
          {
            id: "date",
            labelId: "Pada tanggal berapa kejadian terjadi?",
            labelEn: "On what date did the incident occur?",
            type: "date",
            required: true,
          },
          {
            id: "shift",
            labelId: "Pada shift berapa kejadian terjadi?",
            labelEn: "Which shift did the incident occur?",
            type: "dropdown",
            options: SHIFT_OPTIONS,
            required: true,
          },
        ],
      },
      {
        id: "description",
        titleId: "Deskripsi Kejadian",
        titleEn: "Incident Description",
        fields: [
          {
            id: "location",
            labelId: "Dimanakah kejadian terjadi?",
            labelEn: "Where did the incident occur?",
            type: "dropdown",
            options: LOCATION_OPTIONS,
            required: true,
          },
          {
            id: "description",
            labelId: "Jelaskan kejadian yang ingin anda laporkan",
            labelEn: "Describe the incident you want to report",
            type: "textarea",
            maxLength: 500,
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: "qrp",
    nameId: "Lapor QRP",
    nameEn: "Report QRP",
    icon: "🔍",
    color: "#10B981",
    bgColor: "#ECFDF5",
    steps: [
      {
        id: "identity",
        titleId: "Identitas & Lokasi",
        titleEn: "Identity & Location",
        fields: [
          {
            id: "date",
            labelId: "Pada tanggal berapa anda melakukan observasi?",
            labelEn: "On what date did you conduct the observation?",
            type: "date",
            required: true,
          },
          {
            id: "location",
            labelId: "Dimanakah lokasi temuan QRP?",
            labelEn: "Where is the QRP finding location?",
            type: "dropdown",
            options: LOCATION_OPTIONS,
            required: true,
          },
        ],
      },
      {
        id: "detail",
        titleId: "Detail Temuan QRP",
        titleEn: "QRP Finding Detail",
        fields: [
          {
            id: "category",
            labelId: "Kategori temuan QRP",
            labelEn: "QRP finding category",
            type: "dropdown",
            options: [
              { value: "safety",      labelId: "Safety / Keselamatan",   labelEn: "Safety" },
              { value: "quality",     labelId: "Quality / Kualitas",     labelEn: "Quality" },
              { value: "environment", labelId: "Environment / Lingkungan", labelEn: "Environment" },
            ],
            required: true,
          },
          {
            id: "description",
            labelId: "Jelaskan temuan QRP anda secara rinci",
            labelEn: "Describe your QRP finding in detail",
            type: "textarea",
            maxLength: 500,
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: "kondisi_tidak_aman",
    nameId: "Lapor Kondisi Tidak Aman",
    nameEn: "Report Unsafe Condition",
    icon: "🚨",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    steps: [
      {
        id: "location",
        titleId: "Lokasi & Waktu",
        titleEn: "Location & Time",
        fields: [
          {
            id: "date",
            labelId: "Pada tanggal berapa kondisi tidak aman ditemukan?",
            labelEn: "On what date was the unsafe condition found?",
            type: "date",
            required: true,
          },
          {
            id: "location",
            labelId: "Dimanakah lokasi kondisi tidak aman?",
            labelEn: "Where is the unsafe condition location?",
            type: "dropdown",
            options: LOCATION_OPTIONS,
            required: true,
          },
        ],
      },
      {
        id: "detail",
        titleId: "Detail Kondisi Tidak Aman",
        titleEn: "Unsafe Condition Detail",
        fields: [
          {
            id: "hazard_type",
            labelId: "Jenis bahaya yang ditemukan",
            labelEn: "Type of hazard found",
            type: "dropdown",
            options: [
              { value: "physical",    labelId: "Bahaya Fisik / Physical Hazard",       labelEn: "Physical Hazard" },
              { value: "chemical",    labelId: "Bahaya Kimia / Chemical Hazard",       labelEn: "Chemical Hazard" },
              { value: "biological",  labelId: "Bahaya Biologis / Biological Hazard",  labelEn: "Biological Hazard" },
              { value: "ergonomic",   labelId: "Bahaya Ergonomi / Ergonomic Hazard",   labelEn: "Ergonomic Hazard" },
              { value: "electrical",  labelId: "Bahaya Listrik / Electrical Hazard",   labelEn: "Electrical Hazard" },
            ],
            required: true,
          },
          {
            id: "description",
            labelId: "Jelaskan kondisi tidak aman yang anda temukan",
            labelEn: "Describe the unsafe condition you found",
            type: "textarea",
            maxLength: 500,
            required: true,
          },
        ],
      },
    ],
  },
];
