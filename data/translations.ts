
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
    auth: {
      titles: {
        login: "Espace Client",
        register: "Créer un compte",
        forgot: "Récupération",
        verify: "Vérifiez votre email"
      },
      labels: {
        fullname: "Nom complet",
        company: "Entreprise",
        city: "Ville",
        country: "Pays",
        email: "Email professionnel",
        password: "Mot de passe"
      },
      placeholders: {
        fullname: "Jean Dupont",
        company: "Ma Société SAS",
        city: "Paris",
        country: "France",
        email: "nom@entreprise.com",
        password: "••••••••••••"
      },
      buttons: {
        login: "Connexion",
        register: "Créer mon compte",
        forgot: "Réinitialiser",
        loading: "Chargement...",
        verify_done: "J'ai vérifié mon email",
        resend: "Renvoyer le lien",
        sending: "Envoi...",
        logout: "Se déconnecter",
        back: "Retour au site"
      },
      links: {
        forgot_password: "Mot de passe oublié ?",
        new_user: "Nouveau chez NexGen ?",
        create_account: "Créer un compte",
        existing_user: "Déjà un compte ?",
        login_here: "Se connecter"
      },
      messages: {
        secure: "Connexion sécurisée SSL",
        reset_sent: "Un lien de réinitialisation a été envoyé à votre adresse email.",
        verification_sent: "Un lien de confirmation a été envoyé à",
        verification_instructions: "Veuillez cliquer sur le lien dans l'email pour activer votre compte et accéder au tableau de bord.",
        verification_resent: "Email de vérification renvoyé ! Vérifiez vos spams."
      },
      errors: {
        generic: "Une erreur est survenue.",
        invalid_email: "Format d'email invalide.",
        user_disabled: "Ce compte a été désactivé.",
        user_not_found: "Aucun compte trouvé avec cet email.",
        wrong_password: "Mot de passe incorrect.",
        email_in_use: "Cet email est déjà utilisé.",
        weak_password: "Le mot de passe doit contenir au moins 6 caractères.",
        too_many_requests: "Trop de tentatives. Attendez quelques minutes."
      }
    },
    dashboard: {
      alerts: {
        trial_title: "Période d'essai en cours",
        trial_desc: "Profitez de votre accès complet. Il vous reste",
        trial_days: "jours",
        trial_end: "pour confirmer votre abonnement.",
        trial_btn: "Activer mon compte",
        
        past_due_title: "Renouvellement nécessaire",
        past_due_desc: "Vos services sont actuellement restreints en lecture seule. Régularisez votre situation pour réactiver toutes les fonctionnalités.",
        
        canceled_title: "Compte en pause",
        canceled_desc: "Votre abonnement est actuellement inactif. Contactez notre équipe pour reprendre là où vous en étiez et réactiver vos services.",
        canceled_btn_support: "Contacter le support",
        canceled_btn_logout: "Se déconnecter"
      },
      subscription: {
        title: "Mon Abonnement",
        status_trial: "TRIAL",
        status_active: "ACTIF",
        status_pending: "EN ATTENTE",
        status_disabled: "DÉSACTIVÉ",
        next_due: "Prochaine échéance",
        btn_activate: "Contacter pour activer",
        btn_regularize: "Régulariser maintenant",
        btn_manage: "Gérer l'abonnement",
        btn_invoices: "Mes factures",
        trust_message: "Vous gardez un suivi clair. Le support et la continuité font partie du service."
      },
      invoices: {
        title: "Historique de facturation",
        empty: "Aucune facture disponible pour le moment.",
        status_paid: "Réglée",
        status_unpaid: "En attente",
        pay_btn: "Régler maintenant",
        setup_label: "Frais de mise en place",
        monthly_label: "Abonnement Mensuel",
        footer: "Pour toute question concernant votre facturation, notre équipe est à votre disposition."
      },
      tickets: {
        new_title: "Nouveau Ticket Support",
        subject_label: "Sujet de la demande",
        subject_placeholder: "Ex: Problème d'affichage sur mobile",
        priority_label: "Priorité",
        priority_low: "Basse (Question générale)",
        priority_medium: "Moyenne (Bug mineur)",
        priority_high: "Haute (Site inaccessible)",
        create_btn: "Ouvrir le ticket",
        creating: "Création...",
        chat_header: "Discussion",
        chat_placeholder: "Écrivez votre message...",
        send_btn: "Envoyer",
        no_messages: "Aucun message. Décrivez votre problème pour commencer."
      }
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
    simulator: {
      preheader: "Simulateur de Rentabilité",
      title_1: "Combien votre site web",
      title_2: "devrait-il vous rapporter ?",
      desc: "Répondez à quelques questions sur votre activité, votre ville et vos objectifs. Notre IA (Gemini 3 Pro) croise les données locales pour estimer votre potentiel de chiffre d'affaires.",
      cta_primary: "Lancer la simulation",
      cta_secondary: "Voir la méthodologie IA",
      badge_1: "Analysé par Gemini 3 Pro",
      badge_2: "Données marché temps réel",
      card: {
        title: "EXEMPLE DE RAPPORT",
        subtitle: "Secteur : Rénovation • Ville : Casablanca",
        tag_1: "Analyse : 30s",
        tag_2: "Précision : Haute",
        step_1_title: "Volume de Recherche",
        step_1_val: "4,500 / mois",
        step_1_desc: "Clients cherchant activement vos services dans votre zone.",
        step_2_title: "Conversion Estimée",
        step_2_val: "+15 à 25 Leads",
        step_2_desc: "Demandes de devis qualifiées générées par le système NexGen.",
        step_3_title: "Potentiel CA",
        step_3_val: "+120k MAD / an",
        step_3_desc: "Chiffre d'affaires additionnel estimé basé sur votre panier moyen.",
        footer: "entrepreneurs ont simulé leur potentiel cette semaine.",
        footer_sub: "Simulation gratuite et sans inscription."
      }
    },
    simulatorPage: {
        back: "Quitter le simulateur",
        steps: {
            1: "Activité",
            2: "Objectifs",
            3: "Finances",
            4: "Analyse IA"
        },
        form: {
            sector_label: "Quel est votre métier ou secteur ?",
            sector_placeholder: "Ex: Plombier, Avocat, Menuisier...",
            location_label: "Où exercez-vous ?",
            city_placeholder: "Ville (ex: Casablanca)",
            country_placeholder: "Pays (ex: Maroc)",
            objective_label: "Quel est votre objectif principal ?",
            objectives: {
                calls: "Recevoir des Appels",
                whatsapp: "Messages WhatsApp",
                booking: "Réservations / RDV",
                orders: "Commandes en ligne"
            },
            ticket_label: "Panier moyen d'une vente (MAD) ?",
            currency: "MAD",
            margin_label: "Marge nette estimée (%)",
            margin_sublabel: "Optionnel. Par défaut, nous utilisons une moyenne sectorielle.",
            site_label: "Avez-vous déjà un site web ?",
            button_next: "Continuer",
            button_analyze: "Lancer l'analyse Gemini"
        },
        loading: {
            title: "Gemini analyse votre marché...",
            step1: "Scan des volumes de recherche à",
            step2: "Estimation du CPC et CTR local...",
            step3: "Calcul des taux de conversion...",
            step4: "Projection du ROI sur 12 mois..."
        },
        results: {
            badge: "Analyse de rentabilité terminée",
            title: "Votre Potentiel Mensuel",
            subtitle: "Projection basée sur le Chiffre d'Affaires (CA) estimé.",
            likely_label: "Scénario Probable",
            range_label: "Fourchette estimée :",
            months: "Mois",
            timeline: {
                title: "Trajectoire de Croissance",
                phase1: "Montée progressive",
                phase2: "Stabilisation",
                phase3: "Plein potentiel"
            },
            recommendation: {
                title: "Pack recommandé pour votre activité :",
                reason_label: "Pourquoi ce choix ?",
                plans: {
                    presence: "Pack Présence",
                    boost: "Pack BOOST ⭐",
                    business: "Pack Business"
                }
            },
            cta_whatsapp: "Recevoir le plan sur WhatsApp",
            cta_expert: "Parler à un expert NexGen",
            ai_insight: "L'avis de l'Expert IA"
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
        invoice: { plan: "Abonnement BOOST", status: "Actif • 249 MAD/mois", next_date: "Prochaine facture: 01 Nov" }
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
          price: "199",
          currency: "MAD",
          setup: "499 MAD",
          cta: "Choisir Présence",
          features: ["Nom de domaine inclus", "Site One-Page professionnel", "Design moderne & responsive", "Hébergement sécurisé + SSL", "Configuration technique de base", "Accès Client NexGen (consultation)"],
          limitations: ["Pas d'optimisation SEO avancée", "Pas de chatbot IA", "Support email uniquement"]
        },
        boost: {
          title: "Pack BOOST",
          subtitle: "Pour générer des clients régulièrement",
          price: "249",
          currency: "MAD",
          setup: "699 MAD",
          cta: "Choisir BOOST",
          features: ["Nom de domaine inclus", "Site Multi-pages (5 pages)", "Architecture orientée conversion", "SEO Local optimisé (Google)", "Boutons WhatsApp & Appel visibles", "Chatbot IA de qualification", "Suivi d'avancement Dashboard", "Support prioritaire + Tickets SAV", "Maintenance continue & Mises à jour"]
        },
        business: {
          title: "Business",
          subtitle: "Pour scaler et dominer votre marché",
          price: "449",
          currency: "MAD",
          pricePrefix: "",
          setup: "999 MAD",
          cta: "Choisir Business",
          features: ["Nom de domaine inclus", "Site E-commerce ou Catalogue", "Optimisation conversion avancée", "SEO Technique + Contenu IA", "CRM basique intégré", "Tableau de bord analytics avancé", "Support WhatsApp Prioritaire", "Accompagnement stratégique continu"]
        }
      },
      setup_label: "Frais de Mise en Place",
      setup_payment: "Payé une seule fois",
      most_popular: "Le plus choisi",
      trust_text: ["Aucun engagement", "Support réel et continu", "Vous n'êtes jamais seul après la mise en ligne", "Testez sans risque"]
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
    auth: {
      titles: {
        login: "منطقة العملاء",
        register: "إنشاء حساب",
        forgot: "استعادة كلمة المرور",
        verify: "تحقق من بريدك الإلكتروني"
      },
      labels: {
        fullname: "الاسم الكامل",
        company: "اسم الشركة",
        city: "المدينة",
        country: "الدولة",
        email: "البريد الإلكتروني المهني",
        password: "كلمة المرور"
      },
      placeholders: {
        fullname: "أحمد بناني",
        company: "شركتي م.م",
        city: "الدار البيضاء",
        country: "المغرب",
        email: "email@company.com",
        password: "••••••••••••"
      },
      buttons: {
        login: "تسجيل الدخول",
        register: "إنشاء الحساب",
        forgot: "إعادة تعيين",
        loading: "جار التحميل...",
        verify_done: "تم تأكيد البريد",
        resend: "إعادة إرسال الرابط",
        sending: "جاري الإرسال...",
        logout: "تسجيل الخروج",
        back: "العودة للموقع"
      },
      links: {
        forgot_password: "نسيت كلمة المرور؟",
        new_user: "جديد في NexGen؟",
        create_account: "إنشاء حساب",
        existing_user: "لديك حساب بالفعل؟",
        login_here: "تسجيل الدخول"
      },
      messages: {
        secure: "اتصال آمن SSL",
        reset_sent: "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.",
        verification_sent: "تم إرسال رابط تأكيد إلى",
        verification_instructions: "يرجى النقر على الرابط في البريد الإلكتروني لتفعيل حسابك والوصول إلى لوحة التحكم.",
        verification_resent: "تم إعادة إرسال بريد التحقق! تفقد الرسائل غير المرغوب فيها."
      },
      errors: {
        generic: "حدث خطأ ما.",
        invalid_email: "صيغة البريد الإلكتروني غير صحيحة.",
        user_disabled: "تم تعطيل هذا الحساب.",
        user_not_found: "لا يوجد حساب بهذا البريد الإلكتروني.",
        wrong_password: "كلمة المرور غير صحيحة.",
        email_in_use: "البريد الإلكتروني مستخدم بالفعل.",
        weak_password: "كلمة المرور يجب أن تتكون من 6 أحرف على الأقل.",
        too_many_requests: "محاولات كثيرة جداً. يرجى الانتظار قليلاً."
      }
    },
    dashboard: {
      alerts: {
        trial_title: "فترة تجريبية نشطة",
        trial_desc: "استمتع بكامل الصلاحيات. تبقى",
        trial_days: "أيام",
        trial_end: "لتأكيد اشتراكك.",
        trial_btn: "تفعيل حسابي",
        
        past_due_title: "تجديد الاشتراك مطلوب",
        past_due_desc: "الخدمات مقيدة حالياً في وضع القراءة فقط. يرجى تسوية الوضع لاستعادة كامل الصلاحيات.",
        
        canceled_title: "الحساب متوقف مؤقتاً",
        canceled_desc: "اشتراكك غير نشط حالياً. تواصل مع فريق الدعم لاستعادة حسابك والخدمات من حيث توقفت.",
        canceled_btn_support: "تواصل مع الدعم",
        canceled_btn_logout: "تسجيل الخروج"
      },
      subscription: {
        title: "اشتراكي",
        status_trial: "تجريبي",
        status_active: "نشط",
        status_pending: "معلق",
        status_disabled: "معطل",
        next_due: "تاريخ الاستحقاق",
        btn_activate: "تواصل للتفعيل",
        btn_regularize: "تواصل للتسوية",
        btn_manage: "إدارة الاشتراك",
        btn_invoices: "فواتيري",
        trust_message: "نحن نضمن لك متابعة واضحة. الدعم والاستمرارية جزء من الخدمة."
      },
      invoices: {
        title: "سجل الفواتير",
        empty: "لا توجد فواتير حالياً.",
        status_paid: "مدفوعة",
        status_unpaid: "في الانتظار",
        pay_btn: "ادفع الآن",
        setup_label: "رسوم التأسيس",
        monthly_label: "اشتراك شهري",
        footer: "لأي استفسار حول الفواتير، فريقنا في خدمتك."
      },
      tickets: {
        new_title: "تذكرة دعم جديدة",
        subject_label: "موضوع الطلب",
        subject_placeholder: "مثال: مشكلة في العرض على الهاتف",
        priority_label: "الأولوية",
        priority_low: "منخفضة (سؤال عام)",
        priority_medium: "متوسطة (خطأ بسيط)",
        priority_high: "عالية (الموقع لا يعمل)",
        create_btn: "فتح التذكرة",
        creating: "جاري الإنشاء...",
        chat_header: "المحادثة",
        chat_placeholder: "اكتب رسالتك هنا...",
        send_btn: "إرسال",
        no_messages: "لا توجد رسائل. صف مشكلتك للبدء."
      }
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
    simulator: {
      preheader: "محاكي الربحية",
      title_1: "كم يجب أن يربح",
      title_2: "موقعك الإلكتروني؟",
      desc: "أجب عن بضعة أسئلة حول نشاطك، مدينتك وأهدافك. يقوم ذكاؤنا الاصطناعي (Gemini 3 Pro) بمقاطعة البيانات المحلية لتقدير حجم مبيعاتك المحتمل.",
      cta_primary: "بدء المحاكاة",
      cta_secondary: "شاهد منهجية الذكاء الاصطناعي",
      badge_1: "تم التحليل بواسطة Gemini 3 Pro",
      badge_2: "بيانات سوق فورية",
      card: {
        title: "مثال على التقرير",
        subtitle: "القطاع: التجديد • المدينة: الدار البيضاء",
        tag_1: "التحليل: 30 ثانية",
        tag_2: "الدقة: عالية",
        step_1_title: "حجم البحث",
        step_1_val: "4,500 / شهر",
        step_1_desc: "عملاء يبحثون بنشاط عن خدماتك في منطقتك.",
        step_2_title: "التحويل المتوقع",
        step_2_val: "+15 إلى 25 عميل محتمل",
        step_2_desc: "طلبات عروض أسعار مؤهلة تم إنشاؤها بواسطة نظام NexGen.",
        step_3_title: "حجم المبيعات المحتمل",
        step_3_val: "+120 ألف د.م. / سنة",
        step_3_desc: "رقم معاملات إضافي مقدر بناءً على متوسط سلة مشترياتك.",
        footer: "رائد أعمال قاموا بمحاكاة إمكاناتهم هذا الأسبوع.",
        footer_sub: "محاكاة مجانية وبدون تسجيل."
      }
    },
    simulatorPage: {
        back: "الخروج من المحاكي",
        steps: {
            1: "النشاط",
            2: "الأهداف",
            3: "المالية",
            4: "تحليل الذكاء الاصطناعي"
        },
        form: {
            sector_label: "ما هو مجال نشاطك؟",
            sector_placeholder: "مثال: سباك، محامي، نجار...",
            location_label: "أين تمارس نشاطك؟",
            city_placeholder: "المدينة (مثال: الدار البيضاء)",
            country_placeholder: "البلد (مثال: المغرب)",
            objective_label: "ما هو هدفك الرئيسي؟",
            objectives: {
                calls: "تلقي المكالمات",
                whatsapp: "رسائل واتساب",
                booking: "حجوزات / مواعيد",
                orders: "طلبات عبر الإنترنت"
            },
            ticket_label: "متوسط سلة المشتريات (د.م.)؟",
            currency: "د.م.",
            margin_label: "هامش الربح الصافي المقدر (%)",
            margin_sublabel: "اختياري. افتراضياً، نستخدم متوسط القطاع.",
            site_label: "هل لديك موقع إلكتروني بالفعل؟",
            button_next: "متابعة",
            button_analyze: "ابدأ تحليل Gemini"
        },
        loading: {
            title: "يقوم Gemini بتحليل سوقك...",
            step1: "فحص أحجام البحث في",
            step2: "تقدير تكلفة النقرة ونسبة النقر...",
            step3: "حساب معدلات التحويل...",
            step4: "توقع العائد على الاستثمار لـ 12 شهراً..."
        },
        results: {
            badge: "تم تحليل الربحية",
            title: "إمكاناتك الشهرية",
            subtitle: "توقعات مبنية على رقم المعاملات (CA) المقدر.",
            likely_label: "السيناريو المحتمل",
            range_label: "النطاق المقدر:",
            months: "أشهر",
            timeline: {
                title: "مسار النمو",
                phase1: "صعود تدريجي",
                phase2: "استقرار",
                phase3: "الإمكانات الكاملة"
            },
            recommendation: {
                title: "الباقة الموصى بها لنشاطك:",
                reason_label: "لماذا هذا الخيار؟",
                plans: {
                    presence: "باقة الحضور",
                    boost: "باقة BOOST ⭐",
                    business: "باقة الأعمال"
                }
            },
            cta_whatsapp: "استلام الخطة عبر واتساب",
            cta_expert: "التحدث إلى خبير NexGen",
            ai_insight: "رأي خبير الذكاء الاصطناعي"
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
        invoice: { plan: "اشتراك BOOST", status: "نشط • 249 د.م./شهر", next_date: "الفاتورة القادمة: 01 نوفمبر" }
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
          price: "199",
          currency: "د.م.",
          setup: "499 د.م.",
          cta: "اختر باقة الحضور",
          features: ["موقع صفحة واحدة احترافي", "استضافة عالية الأداء", "شهادة أمان SSL وحماية", "صيانة تقنية شاملة", "تعديل واحد / شهرياً", "دعم عبر البريد الإلكتروني (48 ساعة)"],
          limitations: ["بدون تحسينات SEO متقدمة", "بدون مساعد ذكي (Chatbot)", "الدعم عبر البريد الإلكتروني فقط"]
        },
        boost: {
          title: "باقة النمو (BOOST)",
          subtitle: "لتوليد عملاء نشطين ومبيعات",
          price: "249",
          currency: "د.م.",
          setup: "699 د.م.",
          cta: "ابدأ بجلب العملاء",
          features: ["موقع متعدد الصفحات (5 صفحات)", "هيكلة مخصصة للتحويل وصياغة المحتوى", "تحسين محركات البحث المحلي (SEO)", "ربط واتساب ونظام حجز المواعيد", "لوحة تحكم وإحصائيات", "تعديلات غير محدودة (24 ساعة)", "دعم ذو أولوية عبر واتساب"]
        },
        business: {
          title: "باقة الأعمال",
          subtitle: "لتوسع نشاطك التجاري",
          price: "399",
          currency: "د.م.",
          pricePrefix: "من",
          setup: "من 999 د.م.",
          cta: "تواصل معنا",
          features: ["مجر إلكتروني أو كتالوج", "أتمتة CRM والبريد الإلكتروني", "مدونة واستراتيجية محتوى", "اجتماعات متابعة شهرية", "دعم VIP مخصص"]
        }
      },
      setup_label: "رسوم التأسيس (مرة واحدة)",
      setup_payment: "يُدفع مرة واحدة فقط",
      most_popular: "الأكثر طلباً",
      trust_text: ["بدون أي التزام", "دعم حقيقي ومستمر", "لن تكون وحدك بعد الإطلاق", "جرب بدون مخاطرة"]
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
