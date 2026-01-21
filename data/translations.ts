export type Language = 'fr' | 'ar';

export const translations = {
  fr: {
    nav: {
      solutions: "Solutions",
      methodology: "Méthode",
      pricing: "Tarifs",
      faq: "FAQ",
      login: "Espace Client",
      contact: "Contact"
    },
    hero: {
      badge: "Système orienté conversion",
      title_1: "Ne faites pas un site.",
      title_2: "Lancez une machine à vendre.",
      subtitle: "Fini les freelances injoignables et les sites \"jolis\" qui ne rapportent rien. NexGen crée, héberge et optimise votre écosystème digital pour un abonnement unique.",
      cta_primary: "Voir les offres",
      cta_secondary: "Discuter sur WhatsApp"
    },
    trustbar: {
      no_commitment: "Sans engagement",
      support: "Support réel et continu",
      updates: "Site suivi dans le temps",
      methodology: "Méthodologie Pro",
      results: "Résultats mesurables",
      dashboard: "Espace client dédié"
    },
    problemSolution: {
      title_1: "Le modèle \"Freelance classique\"",
      title_2: "ne fonctionne plus.",
      desc: "Vous avez peut-être déjà vécu ça : un enthousiasme au départ, puis la désillusion. <span class=\"text-white font-medium\">Ce n'est pas votre faute</span>, c'est le système de facturation \"au coup par coup\" qui crée ces conflits.",
      problems: [
        { title: "Silence Radio", desc: "Le freelance disparaît une fois le solde payé. Plus de réponse aux emails." },
        { title: "Site non terminé", desc: "Livré à la va-vite, plein de bugs d'affichage ou non compatible mobile." },
        { title: "Aucun Support", desc: "Une mise à jour plante votre site ? Vous êtes seul pour réparer les dégâts." },
        { title: "SEO de Façade", desc: "Un site visuellement correct, mais invisible sur Google. Zéro trafic." },
        { title: "Accès Bloqués", desc: "Nom de domaine ou hébergement au nom du prestataire. Vous êtes pris en otage." },
        { title: "Promesses non tenues", desc: "Délais explosés, fonctionnalités manquantes et factures supplémentaires." }
      ],
      solution: {
        title: "L'approche NexGen",
        subtitle: "L'antidote au modèle classique",
        desc: "Nous ne vendons pas juste un site. Nous devenons votre <span class=\"text-emerald-400 font-semibold\">partenaire de croissance</span> sur le long terme.",
        features: [
          "Design conçu pour la conversion (Copywriting inclus)",
          "Maintenance technique & Sécurité gérées à 100%",
          "Modifications illimitées sur simple message WhatsApp",
          "Propriété totale de votre contenu et domaine",
          "Coût fixe mensuel transparent, zéro surprise"
        ]
      }
    },
    comparison: {
      title: "Pourquoi NexGen est différent",
      quote_part1: "Vous ne confiez plus votre site à une personne.",
      quote_part2: "Vous confiez votre présence digitale à un système.",
      competitors: {
        title: "Agence / Freelance classique",
        items: [
          { title: "Relation instable", desc: "Le prestataire disparaît souvent une fois le projet livré. Vous êtes seul face aux bugs." },
          { title: "Coûts cachés", desc: "Devis initial attractif, mais chaque modification ou mise à jour est facturée en supplément." },
          { title: "Obsolescence rapide", desc: "Le site vieillit mal, la sécurité n'est pas mise à jour, le design se démode en 1 an." },
          { title: "Dépendance technique", desc: "Hébergement complexe à gérer vous-même ou verrouillé par le prestataire." }
        ]
      },
      nexgen: {
        badge: "Le Standard NexGen",
        title: "L'écosystème NexGen",
        items: [
          { title: "Partenaire Long Terme", desc: "Nous sommes votre équipe technique dédiée. Support disponible 7j/7 via WhatsApp." },
          { title: "Transparence Totale", desc: "Un abonnement fixe. Tout est inclus : hébergement, modifications, maintenance." },
          { title: "Amélioration Continue", desc: "Votre site évolue avec votre business. Nous l'optimisons proactivement pour la conversion." },
          { title: "Liberté & Performance", desc: "Technologie de pointe gérée par nos soins. Vous gardez la propriété de votre contenu." }
        ]
      }
    },
    clientArea: {
      badge: "Inclus dans l'abonnement",
      title_1: "Plus qu'une agence.",
      title_2: "Une plateforme.",
      desc: "NexGen n'est pas un prestataire avec qui vous échangez des emails perdus. C'est un véritable <strong>Mini-SaaS</strong> qui centralise toute votre activité digitale. Transparence totale, contrôle absolu.",
      features: {
        tracking: { title: "Suivi de projet en temps réel", desc: "Une timeline interactive pour savoir exactement où en est la création de votre site. Zéro zone d'ombre." },
        support: { title: "Support & Tickets SAV", desc: "Une demande de modification ? Ouvrez un ticket, suivez son traitement et soyez notifié quand c'est fait." },
        billing: { title: "Facturation centralisée", desc: "Retrouvez toutes vos factures, gérez votre abonnement et vos moyens de paiement en un clic." }
      },
      ui: {
        header: "Espace Client",
        project_progress: "Avancement du projet",
        stages: ["1. Audit", "2. Design", "3. Dév.", "4. Ligne"],
        ticket: { title: "Ticket #204 - Modif' Horaire", status: "Résolu", message: "\"C'est fait ! Les horaires ont été mis à jour sur le pied de page et la page contact...\"" },
        invoice: { plan: "Abonnement BOOST", status: "Actif • 99€/mois", next_date: "Prochaine facture: 01 Nov" }
      }
    },
    features: {
      header_title_1: "Une machine à vendre,",
      header_title_2: "pas juste une vitrine.",
      header_desc: "Chaque fonctionnalité NexGen est conçue pour capturer l'attention et transformer vos visiteurs en clients confirmés.",
      cards: {
        structure: {
          title: "Structure de Vente",
          desc: "Fini les sites brouillons. Nous déployons une architecture persuasive qui guide naturellement le visiteur vers le bouton d'action."
        },
        seo: {
          title: "Domination Locale (SEO)",
          desc: "Soyez le premier résultat sur Google dans votre ville. Nous optimisons votre visibilité pour capter les clients de votre quartier."
        },
        contact: {
          title: "Boutons de Contact",
          desc: "Zéro friction. WhatsApp, Appel, ou RDV en un clic. Vos prospects peuvent vous joindre instantanément, où qu'ils soient."
        },
        forms: {
          title: "Formulaires Intelligents",
          desc: "Des formulaires courts et engageants qui se connectent à votre email. Ne ratez plus jamais une demande de devis."
        },
        chatbot: {
          title: "Chatbot & IA (24/7)",
          desc: "Un assistant virtuel qui accueille vos visiteurs, répond aux questions basiques et capture leurs coordonnées même la nuit."
        },
        stats: {
          title: "Suivi de Performance",
          desc: "Plus de devinettes. Accédez à des statistiques claires sur vos visites et vos conversions depuis votre espace client."
        }
      }
    },
    methodology: {
      title_1: "De l'idée aux",
      title_2: "résultats",
      subtitle: "Notre processus est rodé pour éliminer les frictions et livrer une machine à vendre en moins de 14 jours.",
      steps: {
        1: { title: "Audit & Stratégie", desc: "Analyse de votre marché et définition de vos objectifs de conversion (leads, ventes) avant la moindre ligne de code." },
        2: { title: "Design & Copywriting", desc: "Création d'une identité visuelle premium et rédaction de textes persuasifs conçus pour guider le visiteur." },
        3: { title: "Lancement Boost", desc: "Mise en ligne sur serveurs haute performance, sécurisation SSL et indexation immédiate sur Google." },
        4: { title: "Suivi Continu", desc: "On ne vous lâche pas. Mises à jour techniques, sécurité et modifications illimitées incluses à vie." }
      }
    },
    pricing: {
      title_1: "Des tarifs clairs,",
      title_2: "rentabilisés rapidement",
      subtitle: "Choisissez la puissance de votre machine à vendre. Pas de frais cachés, pas d'engagement, juste des résultats.",
      packs: {
        presence: {
          title: "Présence",
          subtitle: "Pour exister et rassurer",
          price: "49€",
          setup: "299€",
          cta: "Choisir Présence",
          features: ["Site One-Page professionnel", "Hébergement haute performance", "Certificat SSL & Sécurité", "Maintenance technique incluse", "1 modification / mois", "Support par email (48h)"]
        },
        boost: {
          title: "Pack BOOST",
          subtitle: "Pour générer des clients actifs",
          price: "99€",
          setup: "499€",
          cta: "Générer des clients",
          features: ["Site Multi-pages (5 pages)", "Architecture de Conversion & Copywriting", "Optimisation SEO Local", "Intégration WhatsApp & Prise de RDV", "Accès Espace Client & Stats", "Modifications illimitées (24h)", "Support Prioritaire WhatsApp"]
        },
        business: {
          title: "Business",
          subtitle: "Pour scaler votre activité",
          price: "199€",
          setup: "Sur devis",
          cta: "Nous contacter",
          features: ["Site E-commerce ou Catalogue", "Automatisations CRM & Emailing", "Blog & Stratégie de Contenu", "Réunions mensuelles de suivi", "Support VIP Dédié"]
        }
      },
      setup_label: "Mise en place initiale",
      most_popular: "Le plus choisi"
    },
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir avant de lancer votre machine à vendre.",
      items: [
        {
          question: "Suis-je engagé sur la durée ?",
          answer: "Absolument pas. Nos offres sont sans engagement de durée. Vous pouvez résilier votre abonnement à tout moment simplement par email. Le service s'arrêtera à la fin du mois en cours. Nous misons sur votre satisfaction pour vous garder, pas sur un contrat verrouillé."
        },
        {
          question: "À qui appartient le site ?",
          answer: "C'est un point crucial : Votre nom de domaine (ex: votrentreprise.com) et tout votre contenu (vos textes, vos images, votre logo) vous appartiennent à 100%. La structure technique et le code sont mis à disposition par NexGen tant que l'abonnement est actif (modèle SaaS/Location), ce qui nous permet de garantir la maintenance."
        },
        {
          question: "Que se passe-t-il une fois le site en ligne ?",
          answer: "Contrairement à une agence classique qui vous livre et part, c'est là que notre travail de fond commence. Nous surveillons la sécurité, effectuons les mises à jour techniques et restons disponibles pour vos modifications. Votre site ne devient jamais obsolète."
        },
        {
          question: "Pourquoi choisir NexGen plutôt qu'un freelance ?",
          answer: "Pour la tranquillité d'esprit. Un freelance vend un 'produit fini' et passe au client suivant. S'il y a un bug 6 mois plus tard, vous êtes seul ou devez repayer. NexGen est un partenaire continu : nous sommes votre équipe technique externalisée, toujours là, sans surcoût."
        },
        {
          question: "Garantissez-vous des résultats (ventes/appels) ?",
          answer: "Soyons honnêtes : personne ne peut garantir des ventes à 100% car cela dépend aussi de votre offre et de votre marché. Ce que nous garantissons, c'est de vous fournir la meilleure 'machine' possible pour convertir : un site ultra-rapide, optimisé pour le SEO et pensé pour la persuasion. Nous vous donnons la meilleure voiture, à vous de la piloter."
        },
        {
          question: "Comment fonctionne le support et les modifications ?",
          answer: "Besoin de changer un prix ? Une photo ? Une phrase ? Ouvrez un ticket dans votre Espace Client ou envoyez un message WhatsApp. C'est inclus dans l'abonnement. Nous traitons la plupart des demandes simples en moins de 24h ouvrées."
        }
      ]
    },
    finalCTA: {
      title_1: "Arrêtez de perdre des clients.",
      title_2: "Passez au niveau supérieur.",
      desc: "Rejoignez NexGen aujourd'hui. On s'occupe de la technique, du design et de la conversion. Vous vous concentrez sur votre métier. Simple.",
      cta_primary: "Lancer ma machine à vendre",
      cta_secondary: "En discuter d'abord",
      features: ["Sans engagement de durée", "Propriété totale des contenus", "Mise en ligne rapide"]
    },
    footer: {
      desc: "La solution de création de sites web SaaS pour les PME et artisans exigeants. Performance, Design et Conversion sans les tracas techniques.",
      rights: "Tous droits réservés.",
      cgv: "CGV",
      legal: "Mentions Légales",
      privacy: "Confidentialité"
    }
  },
  ar: {
    nav: {
      solutions: "الحلول",
      methodology: "منهجية العمل",
      pricing: "الأسعار",
      faq: "الأسئلة الشائعة",
      login: "منطقة العملاء",
      contact: "اتصل بنا"
    },
    hero: {
      badge: "منظومة مصممة لزيادة المبيعات",
      title_1: "لا تكتفِ بمجرد موقع إلكتروني.",
      title_2: "أطلق آلة حقيقية للمبيعات.",
      subtitle: "وداعاً للمستقلين غير الملتزمين والمواقع \"الجميلة\" التي لا تحقق أرباحاً. NexGen تبني، تستضيف وتطور منظومتك الرقمية بالكامل مقابل اشتراك واحد.",
      cta_primary: "اكتشف العروض",
      cta_secondary: "تحدث معنا عبر واتساب"
    },
    trustbar: {
      no_commitment: "بدون التزام",
      support: "دعم فني مستمر",
      updates: "تحديث ومتابعة دائمة",
      methodology: "منهجية احترافية",
      results: "نتائج قابلة للقياس",
      dashboard: "لوحة تحكم شاملة"
    },
    problemSolution: {
      title_1: "نموذج \"الفريلانسر التقليدي\"",
      title_2: "لم يعد مجدياً.",
      desc: "ربما مررت بهذا من قبل: حماس في البداية، ثم خيبة أمل. <span class=\"text-white font-medium\">الخطأ ليس خطأك</span>، بل هو نظام الدفع \"بالمشروع\" الذي يخلق تضارباً في المصالح.",
      problems: [
        { title: "انقطاع التواصل", desc: "يختفي المستقل بمجرد استلام الدفعة الأخيرة. لا رد على الرسائل." },
        { title: "موقع غير مكتمل", desc: "تسليم متسرع، مليء بالأخطاء البرمجية أو غير متوافق مع الهواتف." },
        { title: "غياب الدعم الفني", desc: "تحديث بسيط يعطل موقعك؟ أنت وحدك في مواجهة المشكلة." },
        { title: "ظهور وهمي (SEO)", desc: "موقع يبدو جيداً ولكنه غير مرئي على جوجل. زيارات معدومة." },
        { title: "حجب الصلاحيات", desc: "الدومين أو الاستضافة مسجلة باسم المطور. أنت رهينة لديه." },
        { title: "وعود زائفة", desc: "تأخير في التسليم، ميزات ناقصة وفواتير إضافية غير متوقعة." }
      ],
      solution: {
        title: "نهج NexGen",
        subtitle: "الحل الجذري للمشاكل التقليدية",
        desc: "نحن لا نبيعك مجرد موقع. نحن نصبح <span class=\"text-emerald-400 font-semibold\">شريكك في النمو</span> على المدى الطويل.",
        features: [
          "تصميم مخصص للتحويل (شاملاً كتابة المحتوى الإعلاني)",
          "صيانة تقنية وحماية أمنية مدارة بالكامل",
          "تعديلات غير محدودة عبر رسالة واتساب بسيطة",
          "ملكية كاملة للمحتوى واسم النطاق الخاص بك",
          "تكلفة شهرية ثابتة وواضحة، بدون أي مفاجآت"
        ]
      }
    },
    comparison: {
      title: "لماذا NexGen مختلفة؟",
      quote_part1: "أنت لا تسلم موقعك لشخص واحد.",
      quote_part2: "أنت تضع وجودك الرقمي في يد نظام متكامل.",
      competitors: {
        title: "الوكالات / الفريلانسر التقليدي",
        items: [
          { title: "علاقة غير مستقرة", desc: "غالباً ما يختفي المطور بعد التسليم. ستجد نفسك وحيداً أمام الأخطاء البرمجية." },
          { title: "تكاليف خفية", desc: "سعر مبدئي جذاب، لكن كل تعديل أو تحديث يتم احتسابه بتكلفة إضافية." },
          { title: "تقادم سريع", desc: "الموقع يشيخ بسرعة، الحماية لا تُحدث، والتصميم يصبح قديماً خلال سنة." },
          { title: "تعقيدات تقنية", desc: "استضافة معقدة عليك إدارتها بنفسك أو محجوزة باسم المطور." }
        ]
      },
      nexgen: {
        badge: "معيار NexGen",
        title: "منظومة NexGen",
        items: [
          { title: "شريك طويل الأمد", desc: "نحن فريقك التقني الخاص. دعم متوفر 7 أيام في الأسبوع عبر واتساب." },
          { title: "شفافية تامة", desc: "اشتراك ثابت. كل شيء مشمول: الاستضافة، التعديلات، والصيانة." },
          { title: "تحسين مستمر", desc: "موقعك يتطور مع نمو عملك. نقوم بتحسينه استباقياً لزيادة المبيعات." },
          { title: "حرية وأداء عالٍ", desc: "تكنولوجيا متطورة نديرها بالنيابة عنك. مع احتفاظك بملكية محتواك بالكامل." }
        ]
      }
    },
    clientArea: {
      badge: "مشمول في الاشتراك",
      title_1: "أكثر من مجرد وكالة.",
      title_2: "منصة متكاملة.",
      desc: "NexGen ليست مجرد مقدم خدمة تضيع رسائله في البريد الإلكتروني. إنها <strong>منصة SaaS مصغرة</strong> تجمع كل نشاطك الرقمي في مكان واحد. شفافية تامة، وتحكم مطلق.",
      features: {
        tracking: { title: "متابعة المشروع لحظة بلحظة", desc: "جدول زمني تفاعلي لتعرف بالضبط أين وصلت عملية إنشاء موقعك. لا مزيد من الغموض." },
        support: { title: "الدعم الفني ونظام التذاكر", desc: "تريد تعديلاً؟ افتح تذكرة، تتبع حالتها، واحصل على إشعار فور الانتهاء منها." },
        billing: { title: "فوترة مركزية", desc: "اعثر على جميع فواتيرك، وأدر اشتراكك وطرق الدفع بنقرة واحدة." }
      },
      ui: {
        header: "منطقة العملاء",
        project_progress: "تقدم المشروع",
        stages: ["1. تدقيق", "2. تصميم", "3. برمجة", "4. نشر"],
        ticket: { title: "تذكرة #204 - تعديل التوقيت", status: "مكتمل", message: "\"تم الأمر! تم تحديث مواعيد العمل في تذييل الصفحة وصفحة اتصل بنا...\"" },
        invoice: { plan: "اشتراك BOOST", status: "نشط • 99€/شهر", next_date: "الفاتورة القادمة: 01 نوفمبر" }
      }
    },
    features: {
      header_title_1: "آلة ذكية للمبيعات،",
      header_title_2: "وليست مجرد واجهة عرض.",
      header_desc: "تم تصميم كل ميزة في NexGen لجذب الانتباه وتحويل الزوار العاديين إلى عملاء دائمين.",
      cards: {
        structure: {
          title: "هيكلة مخصصة للبيع",
          desc: "انتهى زمن المواقع العشوائية. نحن نطبق بنية إقناع مدروسة توجه الزائر بسلاسة نحو اتخاذ قرار الشراء."
        },
        seo: {
          title: "هيمنة على البحث المحلي (SEO)",
          desc: "كن الخيار الأول على Google في مدينتك. نحسن ظهورك لضمان وصول عملاء منطقتك إليك قبل المنافسين."
        },
        contact: {
          title: "تواصل فوري وبلا تعقيد",
          desc: "واتساب، اتصال، أو حجز موعد بضغطة زر. نسهل على عملائك الوصول إليك في أي وقت ومن أي مكان."
        },
        forms: {
          title: "نماذج ذكية وفعالة",
          desc: "نماذج قصيرة وجذابة متصلة ببريدك الإلكتروني مباشرة. لن تفوت أي طلب عرض سعر بعد اليوم."
        },
        chatbot: {
          title: "مساعد ذكي (24/7)",
          desc: "مساعد افتراضي يستقبل زوارك، يجيب على استفساراتهم الأساسية ويجمع بيانات الاتصال بهم حتى أثناء نومك."
        },
        stats: {
          title: "تحليلات دقيقة للأداء",
          desc: "لا مزيد من التخمين. احصل على إحصائيات واضحة حول الزيارات ومعدلات التحويل مباشرة من لوحة التحكم الخاصة بك."
        }
      }
    },
    methodology: {
      title_1: "من الفكرة إلى",
      title_2: "النتائج الملموسة",
      subtitle: "عملية مدروسة بدقة لإزالة العقبات وتسليمك مشروعاً جاهزاً للبيع في أقل من 14 يوماً.",
      steps: {
        1: { title: "التدقيق والاستراتيجية", desc: "تحليل سوقك وتحديد أهدافك بدقة (مبيعات، عملاء محتملين) قبل كتابة أي سطر برمجي." },
        2: { title: "التصميم وصياغة المحتوى", desc: "تصميم هوية بصرية راقية وكتابة نصوص تسويقية مقنعة مصممة لتوجيه الزائر نحو الهدف." },
        3: { title: "الإطلاق القوي", desc: "الرفع على خوادم فائقة السرعة، تأمين شامل SSL، وفهرسة فورية على محركات البحث." },
        4: { title: "المتابعة المستمرة", desc: "لن نتركك وحدك. تحديثات تقنية، حماية أمنية، وتعديلات غير محدودة مشمولة مدى الحياة." }
      }
    },
    pricing: {
      title_1: "أسعار شفافة،",
      title_2: "وعائد استثماري سريع",
      subtitle: "اختر القوة التي تناسب عملك. بدون رسوم خفية، بدون التزام طويل الأمد، فقط نتائج حقيقية.",
      packs: {
        presence: {
          title: "باقة الحضور",
          subtitle: "لإثبات الوجود وبناء الثقة",
          price: "49€",
          setup: "299€",
          cta: "اختر باقة الحضور",
          features: ["موقع صفحة واحدة احترافي", "استضافة عالية الأداء", "شهادة أمان SSL وحماية", "صيانة تقنية شاملة", "تعديل واحد / شهرياً", "دعم عبر البريد الإلكتروني (48 ساعة)"]
        },
        boost: {
          title: "باقة النمو (BOOST)",
          subtitle: "لتوليد عملاء نشطين ومبيعات",
          price: "99€",
          setup: "499€",
          cta: "ابدأ بجلب العملاء",
          features: ["موقع متعدد الصفحات (5 صفحات)", "هيكلة مخصصة للتحويل وصياغة المحتوى", "تحسين محركات البحث المحلي (SEO)", "ربط واتساب ونظام حجز المواعيد", "لوحة تحكم وإحصائيات", "تعديلات غير محدودة (24 ساعة)", "دعم ذو أولوية عبر واتساب"]
        },
        business: {
          title: "باقة الأعمال",
          subtitle: "لتوسع نشاطك التجاري",
          price: "199€",
          setup: "حسب الطلب",
          cta: "تواصل معنا",
          features: ["مجر إلكتروني أو كتالوج", "أتمتة CRM والبريد الإلكتروني", "مدونة واستراتيجية محتوى", "اجتماعات متابعة شهرية", "دعم VIP مخصص"]
        }
      },
      setup_label: "رسوم التأسيس (مرة واحدة)",
      most_popular: "الأكثر طلباً"
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج معرفته قبل إطلاق آلة المبيعات الخاصة بك.",
      items: [
        {
          question: "هل أنا ملزم بعقد طويل الأمد؟",
          answer: "إطلاقاً. عروضنا بدون أي التزام زمني. يمكنك إلغاء اشتراكك في أي وقت ببساطة عبر البريد الإلكتروني. تتوقف الخدمة في نهاية الشهر الحالي. نحن نراهن على رضاك للإبقاء عليك، وليس على عقد ملزم."
        },
        {
          question: "لمن تعود ملكية الموقع؟",
          answer: "هذه نقطة جوهرية: اسم النطاق (مثل: yourbusiness.com) وجميع محتوياتك (نصوصك، صورك، شعارك) ملك لك بنسبة 100%. الهيكل التقني والأكواد توفرها NexGen طالما الاشتراك نشط (نموذج التأجير/SaaS)، مما يسمح لنا بضمان الصيانة."
        },
        {
          question: "ماذا يحدث بعد إطلاق الموقع؟",
          answer: "على عكس الوكالات التقليدية التي تسلمك المشروع وتغادر، هنا يبدأ عملنا الحقيقي. نحن نراقب الأمان، نقوم بالتحديثات التقنية ونبقى متاحين لتعديلاتك. موقعك لا يتقادم أبداً."
        },
        {
          question: "لماذا أختار NexGen بدلاً من فريلانسر؟",
          answer: "من أجل راحة البال. الفريلانسر يبيع \"منتجاً نهائياً\" وينصرف. إذا حدث خطأ بعد 6 أشهر، فأنت وحدك أو عليك الدفع مجدداً. NexGen شريك مستمر: نحن فريقك التقني الخارجي، موجودون دائماً، وبدون تكلفة إضافية."
        },
        {
          question: "هل تضمنون نتائج (مبيعات/اتصالات)؟",
          answer: "لنكن صادقين: لا أحد يستطيع ضمان المبيعات بنسبة 100% لأن ذلك يعتمد أيضاً على عرضك وسوقك. ما نضمنه هو تزويدك بأفضل \"آلة\" ممكنة للتحويل: موقع فائق السرعة، محسن لمحركات البحث (SEO) ومصمم للإقناع. نحن نعطيك أفضل سيارة، وعليك قيادتها."
        },
        {
          question: "كيف يعمل الدعم والتعديلات؟",
          answer: "تحتاج لتغيير سعر؟ صورة؟ جملة؟ افتح تذكرة في منطقة العملاء أو أرسل رسالة واتساب. هذا مشمول في الاشتراك. نعالج معظم الطلبات البسيطة في أقل من 24 ساعة عمل."
        }
      ]
    },
    finalCTA: {
      title_1: "توقف عن خسارة العملاء.",
      title_2: "انتقل إلى المستوى التالي.",
      desc: "انضم إلى NexGen اليوم. نحن نتكفل بالتقنية، التصميم، وزيادة المبيعات. وأنت تركز على عملك. ببساطة.",
      cta_primary: "أطلق آلة المبيعات الخاصة بي",
      cta_secondary: "لنتحدث أولاً",
      features: ["بدون التزام زمني", "ملكية كاملة للمحتوى", "إطلاق سريع"]
    },
    footer: {
      desc: "الحل الأمثل لإنشاء مواقع الويب (SaaS) للشركات الطموحة. نجمع بين الأداء، التصميم، وزيادة المبيعات دون أي تعقيدات تقنية.",
      rights: "جميع الحقوق محفوظة.",
      cgv: "شروط البيع",
      legal: "إشعار قانوني",
      privacy: "الخصوصية"
    }
  }
};