from django.core.management.base import BaseCommand
from core.models import Service, ServiceDetail, ServiceSection, ServiceFAQ, ServiceGalleryImage


class Command(BaseCommand):
    help = "Seed service detail content for the website."

    def handle(self, *args, **options):
        services = [
            {
                "slug": "mobile-app-development",
                "title": "Mobile App Development",
                "description": "High‑performance iOS and Android experiences built for scale.",
                "card_image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
                "category": "mobile",
                "detail": {
                    "meta_title": "Mobile App Development | Cerebro Energia",
                    "meta_description": "Build iOS and Android apps that are fast, stable, and ready to scale.",
                    "hero_subtitle": "Launch mobile products that are fast, stable, and delightful to use.",
                    "hero_highlight": "We build native and cross‑platform apps with measurable outcomes.",
                    "overview": "From discovery to launch, we design and build mobile apps that are reliable, secure, and ready to scale.",
                    "hero_image_url": "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Mobile that feels effortless</h3>"
                    "<p>We create native and cross‑platform apps that load fast, feel smooth, and deliver real business impact.</p>"
                    "<ul>"
                    "<li>App architecture that scales with new features</li>"
                    "<li>Offline‑ready data flows and secure auth</li>"
                    "<li>Release pipelines with QA automation</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "ios-android-engineering",
                "title": "iOS & Android Engineering",
                "description": "Native expertise for smooth UI, speed, and stability.",
                "card_image_url": "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
                "category": "mobile",
                "detail": {
                    "meta_title": "iOS & Android Engineering | Cerebro Energia",
                    "meta_description": "Native engineering for smooth UI, speed, and stability.",
                    "hero_subtitle": "Polished native experiences with reliable performance.",
                    "hero_highlight": "We optimize for speed, accessibility, and platform‑first UX.",
                    "overview": "We deliver native engineering with strict quality gates and a release pipeline you can trust.",
                    "hero_image_url": "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Native quality, built right</h3>"
                    "<p>Our engineers deliver platform‑first experiences that feel fast, intuitive, and stable.</p>"
                    "<ul>"
                    "<li>Swift/SwiftUI and Kotlin expertise</li>"
                    "<li>Performance profiling and memory tuning</li>"
                    "<li>Accessibility and App Store readiness</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "cross-platform-apps",
                "title": "Cross‑Platform Apps",
                "description": "Ship faster with shared code and native‑level polish.",
                "card_image_url": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
                "category": "mobile",
                "detail": {
                    "meta_title": "Cross‑Platform Apps | Cerebro Energia",
                    "meta_description": "Ship faster with shared code and native‑level polish.",
                    "hero_subtitle": "Reach iOS and Android users without sacrificing quality.",
                    "hero_highlight": "Unified codebases, faster iteration, and smooth performance.",
                    "overview": "We build cross‑platform apps with pixel‑perfect UI and optimized runtime performance.",
                    "hero_image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>One codebase, premium UX</h3>"
                    "<p>We deliver shared‑code apps that feel native on every device.</p>"
                    "<ul>"
                    "<li>Design parity across platforms</li>"
                    "<li>Runtime optimization for smooth UI</li>"
                    "<li>Modular architecture for long‑term growth</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "ui-ux-design",
                "title": "UI/UX Product Design",
                "description": "Research‑driven UX and design systems that scale.",
                "card_image_url": "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80",
                "category": "design",
                "detail": {
                    "meta_title": "UI/UX Product Design | Cerebro Energia",
                    "meta_description": "Research‑driven UX and design systems that scale.",
                    "hero_subtitle": "Design systems and flows that users trust and teams can scale.",
                    "hero_highlight": "Research, prototyping, and UI systems built for growth.",
                    "overview": "We design experiences that reduce friction, increase retention, and look exceptional.",
                    "hero_image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Design that drives adoption</h3>"
                    "<p>We translate complex workflows into intuitive interfaces that users love.</p>"
                    "<ul>"
                    "<li>User research and journey mapping</li>"
                    "<li>Interactive prototypes for fast feedback</li>"
                    "<li>Reusable design systems and UI kits</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "web-app-development",
                "title": "Web App Development",
                "description": "Modern web platforms with clean architecture.",
                "card_image_url": "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80",
                "category": "web",
                "detail": {
                    "meta_title": "Web App Development | Cerebro Energia",
                    "meta_description": "Modern web platforms with clean architecture.",
                    "hero_subtitle": "Responsive web applications built for performance and scale.",
                    "hero_highlight": "Modern stacks, clean architecture, and fast delivery.",
                    "overview": "We build web platforms that are fast, secure, and easy to extend.",
                    "hero_image_url": "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Web platforms built to scale</h3>"
                    "<p>We deliver modern web apps with clean architecture and great performance.</p>"
                    "<ul>"
                    "<li>SSR/SSG strategies for speed</li>"
                    "<li>Secure auth and role‑based access</li>"
                    "<li>Analytics and observability baked in</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "backend-apis",
                "title": "Backend APIs & Microservices",
                "description": "Secure, composable services built for growth.",
                "card_image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
                "category": "web",
                "detail": {
                    "meta_title": "Backend APIs & Microservices | Cerebro Energia",
                    "meta_description": "Secure, composable services built for growth.",
                    "hero_subtitle": "APIs and services designed for stability and scale.",
                    "hero_highlight": "Secure, observable, and cloud‑ready infrastructure.",
                    "overview": "We architect backend systems that scale with your product and your team.",
                    "hero_image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Reliable backend foundations</h3>"
                    "<p>We build API layers that are stable, secure, and easy to extend.</p>"
                    "<ul>"
                    "<li>Microservices and event‑driven systems</li>"
                    "<li>Rate limiting, auth, and auditing</li>"
                    "<li>Monitoring and incident response</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "cloud-architecture",
                "title": "Cloud Architecture",
                "description": "Reliable infrastructure with cost‑aware scaling.",
                "card_image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
                "category": "cloud",
                "detail": {
                    "meta_title": "Cloud Architecture | Cerebro Energia",
                    "meta_description": "Reliable infrastructure with cost‑aware scaling.",
                    "hero_subtitle": "Cloud systems built to scale, secure, and optimize spend.",
                    "hero_highlight": "Resilient infrastructure with automated scaling.",
                    "overview": "We design and operate cloud platforms that keep teams fast and reliable.",
                    "hero_image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Cloud that stays lean</h3>"
                    "<p>We design infrastructure that scales without runaway costs.</p>"
                    "<ul>"
                    "<li>Auto‑scaling and capacity planning</li>"
                    "<li>Disaster recovery and backups</li>"
                    "<li>Cost visibility and optimization</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "devops-cicd",
                "title": "DevOps & CI/CD",
                "description": "Automated delivery pipelines and observability.",
                "card_image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
                "category": "devops",
                "detail": {
                    "meta_title": "DevOps & CI/CD | Cerebro Energia",
                    "meta_description": "Automated delivery pipelines and observability.",
                    "hero_subtitle": "Automate releases and improve reliability with CI/CD.",
                    "hero_highlight": "Monitoring, pipelines, and infrastructure as code.",
                    "overview": "We streamline deployments and improve system confidence.",
                    "hero_image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Ship with confidence</h3>"
                    "<p>We set up reliable pipelines that let teams release safely and often.</p>"
                    "<ul>"
                    "<li>CI/CD automation with rollback support</li>"
                    "<li>Monitoring, alerting, and SLOs</li>"
                    "<li>Infrastructure as code and security</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "quality-assurance",
                "title": "Quality Assurance",
                "description": "Manual + automated testing to protect releases.",
                "card_image_url": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
                "category": "qa",
                "detail": {
                    "meta_title": "Quality Assurance | Cerebro Energia",
                    "meta_description": "Manual + automated testing to protect releases.",
                    "hero_subtitle": "QA that prevents regressions and improves confidence.",
                    "hero_highlight": "Test plans, automation, and release validation.",
                    "overview": "We reduce risk with a clear testing strategy and repeatable processes.",
                    "hero_image_url": "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>QA that scales with the product</h3>"
                    "<p>We combine manual testing with automation to catch issues early.</p>"
                    "<ul>"
                    "<li>Regression suites and test coverage</li>"
                    "<li>Performance and security testing</li>"
                    "<li>Release validation and monitoring</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "game-development",
                "title": "Game Development",
                "description": "Interactive experiences built for engagement.",
                "card_image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
                "category": "game",
                "detail": {
                    "meta_title": "Game Development | Cerebro Energia",
                    "meta_description": "Interactive experiences built for engagement.",
                    "hero_subtitle": "Game experiences that balance performance and engagement.",
                    "hero_highlight": "Real‑time systems, animation, and player‑first UX.",
                    "overview": "We build games and interactive products that perform smoothly on modern platforms.",
                    "hero_image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Interactive worlds, solid performance</h3>"
                    "<p>We build games that feel smooth and keep players engaged.</p>"
                    "<ul>"
                    "<li>Real‑time networking and multiplayer</li>"
                    "<li>Optimized rendering and asset pipelines</li>"
                    "<li>Analytics to improve retention</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "ecommerce-development",
                "title": "E-commerce Development",
                "description": "Conversion‑focused storefronts and scalable commerce systems.",
                "card_image_url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
                "category": "web",
                "detail": {
                    "meta_title": "E-commerce Development | Cerebro Energia",
                    "meta_description": "Shopify and custom commerce builds optimized for growth.",
                    "hero_subtitle": "Sell more with fast, elegant storefronts and optimized checkout.",
                    "hero_highlight": "Shopify, headless commerce, and CRO‑driven UX.",
                    "overview": "We design and build commerce experiences that improve conversion, retention, and average order value.",
                    "hero_image_url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Commerce that converts</h3>"
                    "<p>We build storefronts with fast load times, optimized checkout, and clean merchandising.</p>"
                    "<ul>"
                    "<li>Shopify theme customization and apps</li>"
                    "<li>Headless commerce architecture</li>"
                    "<li>Analytics, CRO, and A/B testing</li>"
                    "</ul>"
                ),
            },
            {
                "slug": "ar-vr-development",
                "title": "Augmented & Virtual Reality",
                "description": "Immersive product experiences for training, sales, and education.",
                "card_image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
                "category": "design",
                "detail": {
                    "meta_title": "AR/VR Development | Cerebro Energia",
                    "meta_description": "Immersive AR/VR experiences for modern products.",
                    "hero_subtitle": "Immersive experiences that engage, educate, and convert.",
                    "hero_highlight": "3D interactions, real‑time rendering, and spatial UX.",
                    "overview": "We build AR/VR products that are performant, intuitive, and ready for deployment.",
                    "hero_image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                },
                "rich_body": (
                    "<h3>Immersive product storytelling</h3>"
                    "<p>Create memorable AR/VR experiences with solid performance and usability.</p>"
                    "<ul>"
                    "<li>3D pipelines and asset optimization</li>"
                    "<li>Interactive training and demos</li>"
                    "<li>Cross‑device XR support</li>"
                    "</ul>"
                ),
            },
        ]

        base_sections = [
            {
                "title": "What you get",
                "section_type": "cards",
                "items": [
                    {"title": "Strategy", "body": "Roadmap, KPIs, and phased delivery."},
                    {"title": "Design", "body": "User flows, prototypes, and UI systems."},
                    {"title": "Engineering", "body": "Stable builds with measurable performance."},
                ],
                "order": 1,
            },
            {
                "title": "How we deliver",
                "section_type": "bullets",
                "items": [
                    "Discovery workshops and product alignment",
                    "UX/UI design with usability testing",
                    "Agile sprints with weekly demos",
                    "QA automation and release hardening",
                    "Post‑launch monitoring and iteration",
                ],
                "order": 2,
            },
            {
                "title": "Design and build, end‑to‑end",
                "section_type": "rich",
                "rich_body": (
                    "<h3>Experience-led development</h3>"
                    "<p>We combine product strategy, UI/UX, and engineering to ship software that feels intuitive and performs flawlessly.</p>"
                    "<ul>"
                    "<li>Product discovery and roadmap alignment</li>"
                    "<li>Design systems and interactive prototypes</li>"
                    "<li>Performance, accessibility, and QA hardening</li>"
                    "</ul>"
                ),
                "order": 3,
            },
            {
                "title": "Process deep dive",
                "section_type": "accordion",
                "items": [
                    {"title": "Discovery", "body": "We map goals, users, and constraints."},
                    {"title": "Build", "body": "Iterative development with CI/CD."},
                    {"title": "Launch", "body": "Performance testing and rollout."},
                ],
                "order": 4,
            },
            {
                "title": "Gallery",
                "section_type": "gallery",
                "items": [
                    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
                ],
                "order": 5,
            },
            {
                "title": "Featured work",
                "section_type": "carousel",
                "items": [
                    {
                        "title": "Fintech onboarding",
                        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
                    },
                    {
                        "title": "Logistics dashboard",
                        "image_url": "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80",
                    },
                    {
                        "title": "Healthcare scheduling",
                        "image_url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
                    },
                ],
                "order": 6,
            },
        ]

        base_faqs = [
            {
                "question": "How long does a typical project take?",
                "answer": "Most mobile builds take 8–16 weeks depending on scope.",
                "order": 1,
            },
            {
                "question": "Do you handle post‑launch support?",
                "answer": "Yes — we offer monitoring, maintenance, and new feature cycles.",
                "order": 2,
            },
        ]

        for service_data in services:
            service, _ = Service.objects.get_or_create(
                slug=service_data["slug"],
                defaults={
                    "title": service_data["title"],
                    "description": service_data["description"],
                    "card_image_url": service_data["card_image_url"],
                    "category": service_data["category"],
                },
            )
            service.title = service_data["title"]
            service.description = service_data["description"]
            service.card_image_url = service_data["card_image_url"]
            service.category = service_data["category"]
            service.save()

            detail, _ = ServiceDetail.objects.get_or_create(service=service)
            for key, value in service_data["detail"].items():
                setattr(detail, key, value)
            detail.save()

            ServiceSection.objects.filter(service=service).delete()
            for section in base_sections:
                payload = dict(section)
                if payload.get("section_type") == "rich":
                    payload["rich_body"] = service_data.get("rich_body", payload.get("rich_body", ""))
                ServiceSection.objects.create(service=service, **payload)

            ServiceFAQ.objects.filter(service=service).delete()
            for faq in base_faqs:
                ServiceFAQ.objects.create(service=service, **faq)

            ServiceGalleryImage.objects.filter(service=service).delete()
            for idx, url in enumerate(base_sections[3]["items"]):
                ServiceGalleryImage.objects.create(service=service, image_url=url, order=idx + 1)

        self.stdout.write(self.style.SUCCESS("Seeded service content."))
