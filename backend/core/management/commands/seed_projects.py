from django.core.management.base import BaseCommand
from core.models import Project, ProjectGalleryImage
from datetime import date


class Command(BaseCommand):
    help = "Seed project portfolio content."

    def handle(self, *args, **options):
        projects = [
            {
                "title": "Savoy at Seagoville",
                "slug": "savoy-at-seagoville",
                "client": "Real Estate",
                "category": "Real Estate Platform",
                "summary": "A premium real‑estate website and buyer journey experience for Savoy at Seagoville.",
                "approach": "We ran discovery workshops, defined buyer personas, and designed a conversion‑focused web experience with property filtering and lead capture.",
                "scrum_overview": "4 sprints, 2‑week cadence, weekly demos, backlog grooming every Friday.",
                "duration_weeks": 8,
                "deliverables": "- Responsive marketing site\n- Lead capture + CRM integration\n- Performance and SEO optimization",
                "image_url": "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Savoy at Seagoville | Real Estate Project",
                "meta_description": "A premium real‑estate marketing and buyer journey platform.",
                "completion_date": date(2025, 6, 30),
            },
            {
                "title": "EMR Application for Indian Clinic",
                "slug": "emr-application-indian-clinic",
                "client": "Healthcare",
                "category": "EMR Platform",
                "summary": "A secure EMR system to digitize patient records and appointment workflows.",
                "approach": "We mapped clinic workflows, built role‑based access, and implemented secure patient data storage with audit logs.",
                "scrum_overview": "6 sprints, 2‑week cadence, clinician feedback sessions every sprint.",
                "duration_weeks": 12,
                "deliverables": "- Patient profiles and visit history\n- Appointment scheduling\n- Role‑based access controls",
                "image_url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "EMR Application | Healthcare Project",
                "meta_description": "A secure EMR platform for clinic operations and patient data.",
                "completion_date": date(2025, 9, 15),
            },
            {
                "title": "Retail Consulting Website",
                "slug": "retail-consulting-website",
                "client": "Retail Consulting",
                "category": "Corporate Website",
                "summary": "A modern consulting site with service landing pages and lead capture.",
                "approach": "We created a modular design system and built SEO‑optimized pages for each consulting service.",
                "scrum_overview": "3 sprints, 2‑week cadence, live stakeholder reviews.",
                "duration_weeks": 6,
                "deliverables": "- Modular CMS pages\n- Service landing pages\n- Contact + lead funnel",
                "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Retail Consulting Website | Web Project",
                "meta_description": "SEO‑optimized consulting site with modular CMS pages.",
                "completion_date": date(2025, 3, 5),
            },
            {
                "title": "Food Waste Management using AI",
                "slug": "food-waste-management-ai",
                "client": "Sustainability Tech",
                "category": "AI + Analytics",
                "summary": "AI system to forecast and reduce food waste for large kitchens.",
                "approach": "We built data pipelines, trained forecasting models, and delivered dashboards for kitchen managers.",
                "scrum_overview": "8 sprints, 2‑week cadence, model review every sprint.",
                "duration_weeks": 16,
                "deliverables": "- Forecasting pipeline\n- Waste analytics dashboard\n- Model monitoring",
                "image_url": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Food Waste AI | ML Project",
                "meta_description": "AI system to forecast and reduce food waste.",
                "completion_date": date(2025, 12, 10),
            },
            {
                "title": "Machine Learning Projects Suite",
                "slug": "machine-learning-projects-suite",
                "client": "Enterprise AI",
                "category": "Machine Learning",
                "summary": "A suite of ML prototypes for classification and prediction problems.",
                "approach": "We standardized feature pipelines and built model evaluation dashboards.",
                "scrum_overview": "5 sprints, 2‑week cadence, weekly research syncs.",
                "duration_weeks": 10,
                "deliverables": "- Feature pipelines\n- Model experiments\n- Evaluation dashboards",
                "image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Machine Learning Suite | AI Project",
                "meta_description": "ML prototypes with standardized evaluation pipelines.",
                "completion_date": date(2025, 8, 1),
            },
            {
                "title": "Sentiment Analysis using Transformers",
                "slug": "sentiment-analysis-transformers",
                "client": "Analytics Lab",
                "category": "NLP",
                "summary": "Transformer‑based sentiment analysis system for customer feedback.",
                "approach": "We fine‑tuned transformer models, built labeling workflows, and deployed API endpoints.",
                "scrum_overview": "4 sprints, 2‑week cadence, model eval reviews.",
                "duration_weeks": 8,
                "deliverables": "- Labeling workflow\n- Inference API\n- Monitoring dashboard",
                "image_url": "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Sentiment Analysis | NLP Project",
                "meta_description": "Transformer‑based sentiment analysis for customer feedback.",
                "completion_date": date(2025, 10, 20),
            },
            {
                "title": "CIFAR & CNN Neural Networks",
                "slug": "cifar-cnn-neural-networks",
                "client": "Research Lab",
                "category": "Computer Vision",
                "summary": "Image classification research using CNNs on CIFAR datasets.",
                "approach": "We implemented CNN baselines, experimented with augmentation, and built evaluation pipelines.",
                "scrum_overview": "3 sprints, 2‑week cadence, weekly research review.",
                "duration_weeks": 6,
                "deliverables": "- CNN baselines\n- Augmentation experiments\n- Evaluation reports",
                "image_url": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "CIFAR & CNN | Vision Project",
                "meta_description": "CNN baselines and experiments on CIFAR datasets.",
                "completion_date": date(2025, 7, 10),
            },
            {
                "title": "Shopify Ecommerce Development",
                "slug": "shopify-ecommerce-houston-retail",
                "client": "Retail Store (Houston, TX)",
                "category": "Ecommerce",
                "summary": "Shopify storefront redesign and conversion optimization for a Houston retail brand.",
                "approach": "We audited the existing store, mapped customer journeys, and delivered a redesigned theme with improved navigation, search, and checkout.",
                "scrum_overview": "4 sprints, 2‑week cadence, weekly merchandising reviews.",
                "duration_weeks": 8,
                "deliverables": "- Custom Shopify theme\n- Product discovery + filtering\n- Performance and CRO improvements",
                "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80",
                "meta_title": "Shopify Ecommerce | Houston Retail Project",
                "meta_description": "Shopify ecommerce build with conversion-focused UX for a Houston retailer.",
                "completion_date": date(2025, 11, 1),
            },
        ]

        gallery_urls = [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        ]

        for data in projects:
            project, _ = Project.objects.get_or_create(title=data["title"])
            for key, value in data.items():
                setattr(project, key, value)
            project.save()

            ProjectGalleryImage.objects.filter(project=project).delete()
            for idx, url in enumerate(gallery_urls):
                ProjectGalleryImage.objects.create(
                    project=project,
                    image_url=url,
                    order=idx + 1,
                )

        self.stdout.write(self.style.SUCCESS("Seeded projects."))
