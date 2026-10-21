// Complete 17 Languages Dictionary for BestieVerse
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' }
];

export const resources = {
  en: {
    translation: {
      appName: 'BestieVerse',
      tagline: 'The Ultimate Space for Best Friends',
      nav: {
        home: 'Home',
        games: 'Games',
        chat: 'Chat',
        dailyShare: 'Daily Share & Think',
        diary: 'My Private Diary',
        memories: 'Friendship Memories',
        calls: 'Voice & Video Calls',
        achievements: 'Achievements',
        settings: 'Settings'
      },
      common: {
        save: 'Save',
        saved: 'Saved successfully!',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        join: 'Join',
        play: 'Play Now',
        search: 'Search...',
        loading: 'Loading magical moments...',
        offline: 'Offline Mode: Data saved locally',
        online: 'Connected to BestieVerse'
      },
      home: {
        welcomeTitle: 'Welcome back, besties! 💖',
        welcomeSubtitle: 'Your secret sanctuary for memories, games, thoughts, and infinite laughs.',
        friendshipStreak: 'Friendship Streak',
        daysActive: 'days together',
        quickActions: 'Quick Jump',
        dailyQuoteTitle: 'Bestie Quote of the Day',
        dailyQuote: '"A true friend is the greatest of all blessings and the rarest of treasures."',
        startPlaying: 'Play Tic-Tac-Toe',
        writeDiary: 'Open Diary',
        shareThoughts: 'Daily Share'
      },
      games: {
        title: 'Games Library 🎮',
        subtitle: 'Play casual games, card classics, and friendship quizzes together or solo.',
        searchPlaceholder: 'Search games (e.g. Tic-Tac-Toe, Chess, Ludo)...',
        allCategories: 'All Games',
        localPlay: 'Local Play',
        onlinePlay: 'Online Multiplayer',
        bothPlay: 'Local & Online',
        ticTacToeTitle: 'Tic-Tac-Toe ❌⭕',
        ticTacToeDesc: 'The timeless classic! Play against your bestie locally or challenge the friendly AI.',
        gameMode: 'Game Mode',
        vsFriend: 'vs Bestie (Pass & Play)',
        vsAi: 'vs Smart Bestie AI',
        turnX: 'Player X Turn',
        turnO: 'Player O Turn',
        winnerIs: 'Winner is: ',
        drawGame: "It's a Draw! Both besties are geniuses! 🎉",
        restart: 'Play Again',
        score: 'Scoreboard'
      },
      diary: {
        title: 'My Private Diary 📔',
        subtitle: 'Safe, encrypted in your browser with IndexedDB. Only you hold the keys.',
        newEntry: 'Write New Entry',
        history: 'Diary History',
        moodSelect: 'How are you feeling today?',
        prompt1: '1. What made you smile today?',
        prompt2: '2. What is a thought you could not say out loud?',
        prompt3: '3. What are you most grateful for today?',
        prompt4: '4. How did you support or connect with your bestie recently?',
        prompt5: '5. What is your goal or wish for tomorrow?',
        journalPlaceholder: 'Pour your heart out freely here... Everything stays securely on this device.',
        saveEntry: 'Save to IndexedDB',
        exportBackup: 'Export Backup',
        importBackup: 'Import Backup',
        noEntries: 'No diary entries yet. Write your first reflection today! 🌸'
      },
      settings: {
        title: 'Settings ⚙️',
        appearance: 'Appearance & Theme',
        lightMode: 'Sweet Light Mode 🌸',
        darkMode: 'Cosmic Dark Mode 🌙',
        language: 'Choose Language (17 Languages)',
        profileCustomization: 'Bestie Names',
        yourName: 'Your Name',
        bestieName: "Bestie's Name",
        dataStorage: 'Privacy & Storage',
        storageNotice: 'Diary entries and scrapbook memories are stored privately in your browser using IndexedDB. Export a backup before clearing browser data.'
      }
    }
  },
  ta: {
    translation: {
      appName: 'பெஸ்டிவர்ஸ்',
      tagline: 'உயிர் தோழர்களுக்கான பிரத்யேக இடம்',
      nav: {
        home: 'முகப்பு',
        games: 'விளையாட்டுகள்',
        chat: 'அரட்டை',
        dailyShare: 'தினசரி பகிர்வு',
        diary: 'என் ரகசிய நாட்குறிப்பு',
        memories: 'நட்பின் நினைவுகள்',
        calls: 'அழைப்புகள்',
        achievements: 'சாதனைகள்',
        settings: 'அமைப்புகள்'
      },
      common: {
        save: 'சேமி',
        saved: 'வெற்றிகரமாக சேமிக்கப்பட்டது!',
        cancel: 'ரத்து',
        delete: 'நீக்கு',
        edit: 'திருத்து',
        play: 'விளையாடு',
        search: 'தேடு...',
        loading: 'ஏற்றுகிறது...'
      },
      home: {
        welcomeTitle: 'மீண்டும் நல்வரவு, அன்பு தோழர்களே! 💖',
        welcomeSubtitle: 'நினைவுகள், விளையாட்டுகள் மற்றும் எண்ணங்களுக்கான உங்கள் ரகசிய இடம்.',
        friendshipStreak: 'நட்பு தொடர்',
        daysActive: 'நாட்கள் ஒன்றாக',
        startPlaying: 'டிக்-டாக்-டோ விளையாடு',
        writeDiary: 'நாட்குறிப்பு எழுது'
      },
      games: {
        title: 'விளையாட்டு அரங்கம் 🎮',
        ticTacToeTitle: 'டிக்-டாக்-டோ ❌⭕',
        restart: 'மீண்டும் விளையாடு',
        winnerIs: 'வெற்றியாளர்: '
      },
      diary: {
        title: 'என் தனிப்பட்ட நாட்குறிப்பு 📔',
        saveEntry: 'சேமிக்க',
        noEntries: 'இன்னும் பதிவுகள் இல்லை. இன்றே தொடங்குங்கள்!'
      },
      settings: {
        title: 'அமைப்புகள் ⚙️',
        appearance: 'தோற்றம்',
        language: 'மொழி தேர்வு'
      }
    }
  },
  te: {
    translation: {
      appName: 'బెస్టీవర్స్',
      tagline: 'ప్రాణ స్నేహితుల ప్రత్యేక వేదిక',
      nav: {
        home: 'హోమ్',
        games: 'ఆటలు',
        chat: 'చాట్',
        dailyShare: 'రోజువారీ ఆలోచనలు',
        diary: 'నా ప్రైవేట్ డైరీ',
        memories: 'స్నేహ జ్ఞాపకాలు',
        calls: 'కాల్స్',
        achievements: 'విజయాలు',
        settings: 'సెట్టింగ్‌లు'
      },
      common: { save: 'సేవ్ చేయండి', cancel: 'రద్దు', delete: 'తొలగించు', play: 'ఆడండి', search: 'వెతకండి...' },
      home: { welcomeTitle: 'మళ్ళీ స్వాగతం, బెస్టీస్! 💖', startPlaying: 'టిక్-టాక్-టో ఆడండి' },
      games: { title: 'ఆటల లైబ్రరీ 🎮', restart: 'మళ్ళీ ఆడండి', winnerIs: 'విజేత: ' },
      diary: { title: 'నా ప్రైవేట్ డైరీ 📔', saveEntry: 'సేవ్ చేయండి' },
      settings: { title: 'సెట్టింగ్‌లు ⚙️', language: 'భాషను ఎంచుకోండి' }
    }
  },
  hi: {
    translation: {
      appName: 'बेस्टीवर्स',
      tagline: 'जिगरी दोस्तों की खास दुनिया',
      nav: {
        home: 'होम',
        games: 'गेम्स',
        chat: 'चैट',
        dailyShare: 'दैनिक विचार व साझा',
        diary: 'मेरी निजी डायरी',
        memories: 'दोस्ती की यादें',
        calls: 'वॉयस और वीडियो कॉल',
        achievements: 'उपलब्धियां',
        settings: 'सेटिंग्स'
      },
      common: {
        save: 'सहेजें',
        saved: 'सफलतापूर्वक सहेजा गया!',
        cancel: 'रद्द करें',
        delete: 'हटाएं',
        edit: 'संपादित करें',
        play: 'खेलें',
        search: 'खोजें...',
        loading: 'लोड हो रहा है...'
      },
      home: {
        welcomeTitle: 'स्वागत है, प्यारे दोस्तों! 💖',
        welcomeSubtitle: 'यादों, खेलों, विचारों और अंतहीन हंसी का आपका निजी ठिकाना।',
        friendshipStreak: 'दोस्ती स्ट्रीक',
        daysActive: 'दिन साथ में',
        startPlaying: 'टिक-टैक-टो खेलें',
        writeDiary: 'डायरी लिखें'
      },
      games: {
        title: 'गेम्स लाइब्रेरी 🎮',
        ticTacToeTitle: 'टिक-टैक-टो ❌⭕',
        restart: 'फिर से खेलें',
        winnerIs: 'विजेता हैं: '
      },
      diary: {
        title: 'मेरी निजी डायरी 📔',
        subtitle: 'IndexedDB द्वारा आपके ब्राउज़र में पूरी तरह सुरक्षित।',
        saveEntry: 'डायरी सहेजें',
        noEntries: 'अभी कोई प्रविष्टि नहीं है। आज ही पहला विचार लिखें! 🌸'
      },
      settings: {
        title: 'सेटिंग्स ⚙️',
        appearance: 'रंगरूप और थीम',
        language: 'भाषा चुनें (17 भाषाएं)'
      }
    }
  },
  ml: {
    translation: {
      appName: 'ബെസ്റ്റിവേഴ്സ്',
      tagline: 'കൂട്ടുകാരുടെ സ്വപ്നലോകം',
      nav: { home: 'ഹോം', games: 'ഗെയിമുകൾ', chat: 'ചാറ്റ്', dailyShare: 'ചിന്തകൾ', diary: 'ഡയറി', memories: 'ഓർമ്മകൾ', calls: 'കോളുകൾ', achievements: 'നേട്ടങ്ങൾ', settings: 'ക്രമീകരണങ്ങൾ' },
      common: { save: 'സേവ് ചെയ്യുക', play: 'കളിക്കുക', delete: 'നീക്കം ചെയ്യുക' },
      home: { welcomeTitle: 'സ്വാഗതം കൂട്ടുകാരേ! 💖', startPlaying: 'കളിച്ചു തുടങ്ങൂ' },
      games: { title: 'ഗെയിമുകൾ 🎮', restart: 'വീണ്ടും കളിക്കുക', winnerIs: 'വിജയി: ' },
      diary: { title: 'സ്വകാര്യ ഡയറി 📔' },
      settings: { title: 'ക്രമീകരണങ്ങൾ ⚙️', language: 'ഭാഷ തിരഞ്ഞെടുക്കുക' }
    }
  },
  kn: {
    translation: {
      appName: 'ಬೆಸ್ಟೀವರ್ಸ್',
      tagline: 'ಆಪ್ತ ಮಿತ್ರರ ವಿಶೇಷ ಜಗತ್ತು',
      nav: { home: 'ಮುಖಪುಟ', games: 'ಆಟಗಳು', chat: 'ಚಾಟ್', dailyShare: 'ದೈನಂದಿನ ಹಂಚಿಕೆ', diary: 'ಖಾಸಗಿ ಡೈರಿ', memories: 'ನೆನಪುಗಳು', calls: 'ಕರೆಗಳು', achievements: 'ಸಾಧನೆಗಳು', settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್' },
      common: { save: 'ಉಳಿಸಿ', play: 'ಆಟವಾಡಿ', search: 'ಹುಡುಕಿ...' },
      home: { welcomeTitle: 'ಮತ್ತೆ ಸ್ವಾಗತ ಮಿತ್ರರೇ! 💖', startPlaying: 'ಟಿಕ್-ಟ್ಯಾಕ್-ಟೋ ಆಡಿ' },
      games: { title: 'ಆಟಗಳ ಕೇಂದ್ರ 🎮', restart: 'ಮತ್ತೆ ಆಡಿ', winnerIs: 'ವಿಜೇತರು: ' },
      diary: { title: 'ಖಾಸಗಿ ಡೈರಿ 📔' },
      settings: { title: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ⚙️', language: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ' }
    }
  },
  bn: {
    translation: {
      appName: 'বেস্টিভার্স',
      tagline: 'প্রিয় বন্ধুদের সেরা স্বর্গ',
      nav: { home: 'হোম', games: 'গেমস', chat: 'চ্যাট', dailyShare: 'দৈনিক ভাবনা', diary: 'গোপন ডায়েরি', memories: 'স্মৃতিমালা', calls: 'কলস', achievements: 'অর্জন', settings: 'সেটিংস' },
      common: { save: 'সংরক্ষণ', play: 'খেলুন', search: 'অনুসন্ধান...' },
      home: { welcomeTitle: 'স্বাগতম প্রিয় বন্ধুরা! 💖', startPlaying: 'টিক-ট্যাক-টো খেলুন' },
      games: { title: 'গেমস লাইব্রেরি 🎮', restart: 'আবার খেলুন', winnerIs: 'বিজয়ী: ' },
      diary: { title: 'আমার ব্যক্তিগত ডায়েরি 📔' },
      settings: { title: 'সেটিংস ⚙️', language: 'ভাষা নির্বাচন করুন' }
    }
  },
  mr: {
    translation: {
      appName: 'बेस्टीव्हर्स',
      tagline: 'जीवलग मित्रांचे खास जग',
      nav: { home: 'होम', games: 'खेळ', chat: 'गप्पा', dailyShare: 'दैनिक विचार', diary: 'माझी डायरी', memories: 'आठवणी', calls: 'कॉल्स', achievements: 'यश', settings: 'सेटिंग्ज' },
      common: { save: 'जतन करा', play: 'खेळा', search: 'शोधा...' },
      home: { welcomeTitle: 'पुन्हा स्वागत आहे दोस्तांनो! 💖', startPlaying: 'खेळ सुरू करा' },
      games: { title: 'खेळांचे दालन 🎮', restart: 'पुन्हा खेळा', winnerIs: 'विजेता: ' },
      diary: { title: 'माझी खाजगी डायरी 📔' },
      settings: { title: 'सेटिंग्ज ⚙️', language: 'भाषा निवडा' }
    }
  },
  gu: {
    translation: {
      appName: 'બેસ્ટીવર્સ',
      tagline: 'પાક્કા મિત્રોની અનોખી દુનિયા',
      nav: { home: 'હોમ', games: 'રમતો', chat: 'ચેટ', dailyShare: 'દૈનિક વિચારો', diary: 'મારી ડાયરી', memories: 'યાદો', calls: 'કોલ્સ', achievements: 'સિદ્ધિઓ', settings: 'સેટિંગ્સ' },
      common: { save: 'સાચવો', play: 'રમો', search: 'શોધો...' },
      home: { welcomeTitle: 'સ્વાગત છે પ્રિય દોસ્તો! 💖', startPlaying: 'રમવાનું શરૂ કરો' },
      games: { title: 'રમતોનું પુસ્તકાલય 🎮', restart: 'ફરીથી રમો', winnerIs: 'વિજેતા: ' },
      diary: { title: 'મારી અંગત ડાયરી 📔' },
      settings: { title: 'સેટિંગ્સ ⚙️', language: 'ભાષા પસંદ કરો' }
    }
  },
  pa: {
    translation: {
      appName: 'ਬੈਸਟੀਵਰਸ',
      tagline: 'ਪੱਕੇ ਯਾਰਾਂ ਦੀ ਆਪਣੀ ਦੁਨੀਆ',
      nav: { home: 'ਘਰ', games: 'ਖੇਡਾਂ', chat: 'ਗੱਲਬਾਤ', dailyShare: 'ਰੋਜ਼ਾਨਾ ਵਿਚਾਰ', diary: 'ਮੇਰੀ ਡਾਇਰੀ', memories: 'ਯਾਦਾਂ', calls: 'ਕਾਲਾਂ', achievements: 'ਪ੍ਰਾਪਤੀਆਂ', settings: 'ਸੈਟਿੰਗਾਂ' },
      common: { save: 'ਸੰਭਾਲੋ', play: 'ਖੇਡੋ', search: 'ਖੋਜੋ...' },
      home: { welcomeTitle: 'ਜੀ ਆਇਆਂ ਨੂੰ ਦੋਸਤੋ! 💖', startPlaying: 'ਟਿਕ-ਟੈਕ-ਟੋ ਖੇਡੋ' },
      games: { title: 'ਖੇਡਾਂ ਦੀ ਲਾਇਬ੍ਰੇਰੀ 🎮', restart: 'ਦੁਬਾਰਾ ਖੇਡੋ', winnerIs: 'ਜੇਤੂ: ' },
      diary: { title: 'ਮੇਰੀ ਨਿੱਜੀ ਡਾਇਰੀ 📔' },
      settings: { title: 'ਸੈਟਿੰਗਾਂ ⚙️', language: 'ਭਾਸ਼ਾ ਚੁਣੋ' }
    }
  },
  fr: {
    translation: {
      appName: 'BestieVerse',
      tagline: "L'univers ultime des meilleurs amis",
      nav: { home: 'Accueil', games: 'Jeux', chat: 'Chat', dailyShare: 'Partage Quotidien', diary: 'Journal Intime', memories: 'Souvenirs', calls: 'Appels', achievements: 'Succès', settings: 'Paramètres' },
      common: { save: 'Enregistrer', play: 'Jouer', cancel: 'Annuler', delete: 'Supprimer', search: 'Rechercher...' },
      home: { welcomeTitle: 'Bienvenue, meilleurs amis ! 💖', startPlaying: 'Jouer au Morpion', writeDiary: 'Ouvrir le Journal' },
      games: { title: 'Bibliothèque de Jeux 🎮', restart: 'Rejouer', winnerIs: 'Le gagnant est : ' },
      diary: { title: 'Mon Journal Intime 📔', saveEntry: 'Enregistrer dans IndexedDB' },
      settings: { title: 'Paramètres ⚙️', language: 'Choisir la langue' }
    }
  },
  es: {
    translation: {
      appName: 'BestieVerse',
      tagline: 'El universo definitivo para mejores amigos',
      nav: { home: 'Inicio', games: 'Juegos', chat: 'Chat', dailyShare: 'Compartir Diario', diary: 'Mi Diario Íntimo', memories: 'Recuerdos', calls: 'Llamadas', achievements: 'Logros', settings: 'Ajustes' },
      common: { save: 'Guardar', play: 'Jugar', cancel: 'Cancelar', delete: 'Eliminar', search: 'Buscar...' },
      home: { welcomeTitle: '¡Bienvenidos, mejores amigos! 💖', startPlaying: 'Jugar Tres en Raya', writeDiary: 'Escribir Diario' },
      games: { title: 'Biblioteca de Juegos 🎮', restart: 'Jugar de nuevo', winnerIs: 'El ganador es: ' },
      diary: { title: 'Mi Diario Privado 📔', saveEntry: 'Guardar en IndexedDB' },
      settings: { title: 'Ajustes ⚙️', language: 'Seleccionar idioma' }
    }
  },
  de: {
    translation: {
      appName: 'BestieVerse',
      tagline: 'Das ultimative Universum für beste Freunde',
      nav: { home: 'Startseite', games: 'Spiele', chat: 'Chat', dailyShare: 'Täglicher Austausch', diary: 'Mein Tagebuch', memories: 'Erinnerungen', calls: 'Anrufe', achievements: 'Erfolge', settings: 'Einstellungen' },
      common: { save: 'Speichern', play: 'Spielen', cancel: 'Abbrechen', delete: 'Löschen', search: 'Suchen...' },
      home: { welcomeTitle: 'Willkommen zurück, Besties! 💖', startPlaying: 'Tic-Tac-Toe spielen' },
      games: { title: 'Spiele-Bibliothek 🎮', restart: 'Nochmal spielen', winnerIs: 'Gewinner ist: ' },
      diary: { title: 'Mein privates Tagebuch 📔', saveEntry: 'Speichern' },
      settings: { title: 'Einstellungen ⚙️', language: 'Sprache wählen' }
    }
  },
  ja: {
    translation: {
      appName: 'BestieVerse',
      tagline: '親友たちの最高の空間',
      nav: { home: 'ホーム', games: 'ゲーム', chat: 'チャット', dailyShare: '今日のシェア', diary: '秘密の日記', memories: '思い出', calls: '通話', achievements: 'アチーブメント', settings: '設定' },
      common: { save: '保存', play: '遊ぶ', cancel: 'キャンセル', delete: '削除', search: '検索...' },
      home: { welcomeTitle: 'おかえり、大親友！💖', startPlaying: '三目並べで遊ぶ', writeDiary: '日記を書く' },
      games: { title: 'ゲーム一覧 🎮', restart: 'もう一度', winnerIs: '勝者: ' },
      diary: { title: '私の秘密日記 📔', saveEntry: '保存する' },
      settings: { title: '設定 ⚙️', language: '言語を選択' }
    }
  },
  ko: {
    translation: {
      appName: '베스티버스',
      tagline: '단짝 친구들을 위한 특별한 아지트',
      nav: { home: '홈', games: '게임', chat: '채팅', dailyShare: '오늘의 생각', diary: '비밀 일기', memories: '추억 앨범', calls: '통화', achievements: '업적', settings: '설정' },
      common: { save: '저장', play: '게임 시작', cancel: '취소', delete: '삭제', search: '검색...' },
      home: { welcomeTitle: '환영해, 최고의 단짝! 💖', startPlaying: '틱택토 하기' },
      games: { title: '게임 라이브러리 🎮', restart: '다시 하기', winnerIs: '승자: ' },
      diary: { title: '나만의 비밀 일기 📔', saveEntry: '저장하기' },
      settings: { title: '설정 ⚙️', language: '언어 선택' }
    }
  },
  zh: {
    translation: {
      appName: 'BestieVerse',
      tagline: '死党闺蜜的专属元宇宙',
      nav: { home: '首页', games: '游戏', chat: '聊天', dailyShare: '每日心声', diary: '私密日记', memories: '友谊回忆', calls: '音视频通话', achievements: '成就', settings: '设置' },
      common: { save: '保存', play: '开始游戏', cancel: '取消', delete: '删除', search: '搜索...' },
      home: { welcomeTitle: '欢迎回来，好闺蜜/好兄弟！💖', startPlaying: '玩井字棋', writeDiary: '写日记' },
      games: { title: '游戏大厅 🎮', restart: '再玩一局', winnerIs: '获胜者是：' },
      diary: { title: '我的私密日记 📔', saveEntry: '保存到 IndexedDB' },
      settings: { title: '设置 ⚙️', language: '切换语言' }
    }
  },
  ar: {
    translation: {
      appName: 'بيستي فيرس',
      tagline: 'الملاذ الأمثل لأعز الأصدقاء',
      nav: { home: 'الرئيسية', games: 'الألعاب', chat: 'الدردشة', dailyShare: 'المشاركة اليومية', diary: 'مذكراتي الخاصة', memories: 'ذكريات الصداقة', calls: 'المكالمات', achievements: 'الإنجازات', settings: 'الإعدادات' },
      common: { save: 'حفظ', play: 'العب الآن', cancel: 'إلغاء', delete: 'حذف', search: 'بحث...' },
      home: { welcomeTitle: 'أهلاً بعودتكم، أعز الأصدقاء! 💖', startPlaying: 'العب إكس أو (تيك تاك تو)' },
      games: { title: 'مكتبة الألعاب 🎮', restart: 'العب مرة أخرى', winnerIs: 'الفائز هو: ' },
      diary: { title: 'مذكراتي الخاصة 📔', saveEntry: 'حفظ في IndexedDB' },
      settings: { title: 'الإعدادات ⚙️', language: 'اختر اللغة' }
    }
  }
};
