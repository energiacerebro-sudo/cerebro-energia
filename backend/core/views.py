import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (
    SiteSetting,
    Page,
    Service,
    Project,
    ContactSubmission,
    ServiceDetail,
    ServiceSection,
    ServiceFAQ,
    ServiceGalleryImage,
    ServiceCarouselItem,
    ProjectGalleryImage,
    BlogPost,
    BlogGalleryImage,
    BlogCarouselItem,
    BlogReview,
    Testimonial,
)


def _image_url(request, image_field, fallback_url=""):
    if image_field:
        return request.build_absolute_uri(image_field.url)
    return fallback_url or ""


def site_settings(request):
    setting = SiteSetting.objects.first()
    if not setting:
        return JsonResponse(
            {
                "company_name": "Cerebro Energia",
                "tagline": "Clean energy, smarter systems.",
                "hero_title": "Powering smarter energy futures",
                "hero_subtitle": "We design, build, and operate clean energy infrastructure.",
            }
        )
    return JsonResponse(
        {
            "company_name": setting.company_name,
            "tagline": setting.tagline,
            "email": setting.email,
            "phone": setting.phone,
            "address": setting.address,
            "hero_title": setting.hero_title,
            "hero_subtitle": setting.hero_subtitle,
        }
    )


def pages(request):
    return JsonResponse(
        {
            "pages": list(Page.objects.values("slug", "title", "body")),
        }
    )


def services(request):
    services_data = []
    for service in Service.objects.all().order_by("order", "id"):
        services_data.append(
            {
                "slug": service.slug,
                "title": service.title,
                "description": service.description,
                "category": service.category,
                "order": service.order,
                "card_image": _image_url(request, service.card_image, service.card_image_url),
            }
        )
    return JsonResponse({"services": services_data})


def projects(request):
    return JsonResponse(
        {
            "projects": [
                {
                    "slug": p.slug,
                    "title": p.title,
                    "summary": p.summary,
                    "location": p.location,
                    "completion_date": p.completion_date,
                    "image": _image_url(request, p.image, p.image_url),
                    "client": p.client,
                    "category": p.category,
                    "duration_weeks": p.duration_weeks,
                    "scrum_overview": p.scrum_overview,
                    "approach": p.approach,
                    "deliverables": p.deliverables,
                }
                for p in Project.objects.all().order_by("completion_date", "title")
            ],
        }
    )


def project_detail(request, slug):
    try:
        project = Project.objects.get(slug=slug)
    except Project.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    gallery = ProjectGalleryImage.objects.filter(project=project)

    return JsonResponse(
        {
            "project": {
                "slug": project.slug,
                "title": project.title,
                "summary": project.summary,
                "location": project.location,
                "completion_date": project.completion_date,
                "image": _image_url(request, project.image, project.image_url),
                "client": project.client,
                "category": project.category,
                "duration_weeks": project.duration_weeks,
                "scrum_overview": project.scrum_overview,
                "approach": project.approach,
                "deliverables": project.deliverables,
                "meta_title": project.meta_title,
                "meta_description": project.meta_description,
                "meta_image": _image_url(request, project.meta_image, ""),
            },
            "gallery": [
                {
                    "title": img.title,
                    "image_url": _image_url(request, img.image, img.image_url),
                    "order": img.order,
                }
                for img in gallery
            ],
        }
    )


def blog_list(request):
    page = int(request.GET.get("page", 1))
    page_size = int(request.GET.get("page_size", 6))
    if page < 1:
        page = 1
    if page_size < 1 or page_size > 24:
        page_size = 6

    posts = BlogPost.objects.all().order_by("-published_date", "-id")
    total = posts.count()
    start = (page - 1) * page_size
    end = start + page_size
    items = posts[start:end]

    data = []
    for post in items:
        data.append(
            {
                "slug": post.slug,
                "title": post.title,
                "excerpt": post.excerpt,
                "category": post.category,
                "author": post.author,
                "published_date": post.published_date,
                "reading_time": post.reading_time,
                "featured": post.featured,
                "hero_image": _image_url(request, post.hero_image, post.hero_image_url),
            }
        )

    featured = (
        BlogPost.objects.filter(featured=True)
        .order_by("-published_date", "-id")
        .first()
    )

    return JsonResponse(
        {
            "posts": data,
            "page": page,
            "page_size": page_size,
            "total": total,
            "featured": {
                "slug": featured.slug,
                "title": featured.title,
                "excerpt": featured.excerpt,
                "category": featured.category,
                "author": featured.author,
                "published_date": featured.published_date,
                "reading_time": featured.reading_time,
                "featured": featured.featured,
                "hero_image": _image_url(request, featured.hero_image, featured.hero_image_url),
            }
            if featured
            else None,
        }
    )


def blog_detail(request, slug):
    try:
        post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    gallery = BlogGalleryImage.objects.filter(post=post)
    carousel = BlogCarouselItem.objects.filter(post=post)
    reviews = BlogReview.objects.filter(post=post).order_by("-created_at")

    return JsonResponse(
        {
            "post": {
                "slug": post.slug,
                "title": post.title,
                "excerpt": post.excerpt,
                "content": post.content,
                "category": post.category,
                "author": post.author,
                "published_date": post.published_date,
                "reading_time": post.reading_time,
                "featured": post.featured,
                "hero_image": _image_url(request, post.hero_image, post.hero_image_url),
            },
            "gallery": [
                {
                    "title": img.title,
                    "image_url": _image_url(request, img.image, img.image_url),
                    "order": img.order,
                }
                for img in gallery
            ],
            "carousel": [
                {
                    "title": item.title,
                    "image_url": _image_url(request, item.image, item.image_url),
                    "order": item.order,
                }
                for item in carousel
            ],
            "reviews": [
                {
                    "reviewer_name": r.reviewer_name,
                    "rating": r.rating,
                    "review": r.review,
                    "created_at": r.created_at,
                }
                for r in reviews
            ],
        }
    )


def testimonials(request):
    data = []
    for t in Testimonial.objects.all():
        data.append(
            {
                "name": t.name,
                "gender": t.gender,
                "country": t.country,
                "state": t.state,
                "city": t.city,
                "role": t.role,
                "review": t.review,
                "image": _image_url(request, t.image, t.image_url),
            }
        )
    return JsonResponse({"testimonials": data})


def service_detail(request, slug):
    try:
        service = Service.objects.get(slug=slug)
    except Service.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    detail = ServiceDetail.objects.filter(service=service).first()
    sections = ServiceSection.objects.filter(service=service).values(
        "title", "section_type", "body", "rich_body", "items", "order"
    )
    faqs = ServiceFAQ.objects.filter(service=service).values("question", "answer", "order")
    gallery = ServiceGalleryImage.objects.filter(service=service)
    carousel = ServiceCarouselItem.objects.filter(service=service)

    related = (
        Service.objects.exclude(id=service.id)
        .filter(category=service.category)
        .values("slug", "title", "description", "card_image_url")[:3]
    )
    if not related:
        related = (
            Service.objects.exclude(id=service.id)
            .values("slug", "title", "description", "card_image_url")[:3]
        )

    return JsonResponse(
        {
            "service": {
                "slug": service.slug,
                "title": service.title,
                "description": service.description,
                "order": service.order,
                "category": service.category,
                "card_image": _image_url(request, service.card_image, service.card_image_url),
            },
            "detail": {
                "meta_title": getattr(detail, "meta_title", ""),
                "meta_description": getattr(detail, "meta_description", ""),
                "meta_image": _image_url(request, getattr(detail, "meta_image", None), ""),
                "hero_subtitle": getattr(detail, "hero_subtitle", ""),
                "hero_highlight": getattr(detail, "hero_highlight", ""),
                "overview": getattr(detail, "overview", ""),
                "cta_text": getattr(detail, "cta_text", "Start your project"),
                "cta_link": getattr(detail, "cta_link", "/contact"),
                "hero_image": _image_url(request, getattr(detail, "hero_image", None), getattr(detail, "hero_image_url", "")),
            },
            "sections": list(sections),
            "faqs": list(faqs),
            "gallery": [
                {
                    "title": img.title,
                    "image_url": _image_url(request, img.image, img.image_url),
                    "order": img.order,
                }
                for img in gallery
            ],
            "carousel": [
                {
                    "title": item.title,
                    "image_url": _image_url(request, item.image, item.image_url),
                    "order": item.order,
                }
                for item in carousel
            ],
            "related": list(related),
        }
    )


@csrf_exempt
def contact(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip()
    message = payload.get("message", "").strip()

    if not name or not email or not message:
        return JsonResponse({"error": "All fields are required"}, status=400)

    ContactSubmission.objects.create(name=name, email=email, message=message)
    return JsonResponse({"ok": True})
