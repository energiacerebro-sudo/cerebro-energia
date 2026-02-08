from django.core.management.base import BaseCommand
from datetime import date
from core.models import BlogPost, BlogGalleryImage, BlogCarouselItem, BlogReview


class Command(BaseCommand):
    help = "Seed blog content."

    def handle(self, *args, **options):
        posts = [
            {
                "slug": "building-mobile-products-that-scale",
                "title": "Building Mobile Products That Scale",
                "excerpt": "What it takes to deliver high‑performance mobile apps with reliable release cycles.",
                "content": "<h3>Start with stability</h3><p>We prioritize performance budgets, crash‑free sessions, and clear metrics from day one.</p><ul><li>Architecture for long‑term growth</li><li>Release pipelines with QA</li><li>Monitoring and iteration</li></ul>",
                "category": "Mobile",
                "author": "Cerebro Energia",
                "published_date": date(2025, 10, 1),
                "reading_time": 6,
                "featured": True,
                "hero_image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
            },
            {
                "slug": "design-systems-for-fast-moving-teams",
                "title": "Design Systems for Fast‑Moving Teams",
                "excerpt": "How to scale UI/UX across products without slowing delivery.",
                "content": "<h3>Consistency at speed</h3><p>Reusable patterns improve quality and velocity without sacrificing creativity.</p><ul><li>Component libraries</li><li>Accessibility standards</li><li>Cross‑platform alignment</li></ul>",
                "category": "Design",
                "author": "Cerebro Energia",
                "published_date": date(2025, 9, 10),
                "reading_time": 5,
                "featured": False,
                "hero_image_url": "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80",
            },
            {
                "slug": "cloud-architecture-with-cost-control",
                "title": "Cloud Architecture With Cost Control",
                "excerpt": "A pragmatic approach to scaling systems without runaway cloud bills.",
                "content": "<h3>Predictable scaling</h3><p>Right‑size infrastructure with cost visibility baked in.</p><ul><li>Auto‑scaling policies</li><li>Observability and alerts</li><li>FinOps practices</li></ul>",
                "category": "Cloud",
                "author": "Cerebro Energia",
                "published_date": date(2025, 8, 18),
                "reading_time": 7,
                "featured": False,
                "hero_image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
            },
        ]

        for post_data in posts:
            post, _ = BlogPost.objects.get_or_create(slug=post_data["slug"])
            for key, value in post_data.items():
                setattr(post, key, value)
            post.save()

            BlogGalleryImage.objects.filter(post=post).delete()
            BlogCarouselItem.objects.filter(post=post).delete()
            BlogReview.objects.filter(post=post).delete()

            gallery_urls = [
                "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
            ]
            for idx, url in enumerate(gallery_urls):
                BlogGalleryImage.objects.create(post=post, image_url=url, order=idx + 1)

            carousel_urls = [
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
            ]
            for idx, url in enumerate(carousel_urls):
                BlogCarouselItem.objects.create(post=post, image_url=url, order=idx + 1)

            BlogReview.objects.create(
                post=post,
                reviewer_name="Aditi Sharma",
                rating=5,
                review="Clear structure, great engineering practices, and practical advice.",
            )
            BlogReview.objects.create(
                post=post,
                reviewer_name="Carlos M.",
                rating=4,
                review="Useful perspective on scaling. Would love more examples.",
            )

        self.stdout.write(self.style.SUCCESS("Seeded blog content."))
