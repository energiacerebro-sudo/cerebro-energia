from django.db import models


class SiteSetting(models.Model):
    company_name = models.CharField(max_length=120, default="Cerebro Energia")
    tagline = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=200, blank=True)
    hero_title = models.CharField(max_length=200, default="Powering smarter energy futures")
    hero_subtitle = models.TextField(blank=True)

    def __str__(self):
        return self.company_name


class Page(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=120)
    body = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Service(models.Model):
    slug = models.SlugField(unique=True, blank=True, null=True)
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    card_image = models.ImageField(upload_to="services/cards/", blank=True, null=True)
    card_image_url = models.URLField(blank=True)
    category = models.CharField(
        max_length=40,
        choices=[
            ("mobile", "Mobile"),
            ("web", "Web"),
            ("design", "Design"),
            ("cloud", "Cloud"),
            ("devops", "DevOps"),
            ("qa", "QA"),
            ("game", "Game"),
        ],
        default="mobile",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class ServiceDetail(models.Model):
    service = models.OneToOneField(Service, on_delete=models.CASCADE, related_name="detail")
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)
    meta_image = models.ImageField(upload_to="services/meta/", blank=True, null=True)
    hero_subtitle = models.TextField(blank=True)
    hero_highlight = models.TextField(blank=True)
    overview = models.TextField(blank=True)
    cta_text = models.CharField(max_length=120, default="Start your project")
    cta_link = models.CharField(max_length=200, default="/contact")
    hero_image = models.ImageField(upload_to="services/hero/", blank=True, null=True)
    hero_image_url = models.URLField(blank=True)

    def __str__(self):
        return f"Detail: {self.service.title}"


class ServiceSection(models.Model):
    SECTION_TYPES = [
        ("cards", "Cards"),
        ("bullets", "Bullets"),
        ("accordion", "Accordion"),
        ("gallery", "Gallery"),
        ("carousel", "Carousel"),
        ("text", "Text"),
        ("rich", "Rich Text"),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="sections")
    title = models.CharField(max_length=120)
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES)
    body = models.TextField(blank=True)
    rich_body = models.TextField(blank=True)
    items = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.service.title} - {self.title}"


class ServiceFAQ(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="faqs")
    question = models.CharField(max_length=200)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.question


class ServiceGalleryImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="gallery")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="services/gallery/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title or self.image_url


class ServiceCarouselItem(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="carousel")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="services/carousel/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title or self.image_url


class Project(models.Model):
    slug = models.SlugField(unique=True, blank=True, null=True)
    title = models.CharField(max_length=120)
    summary = models.TextField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    client = models.CharField(max_length=120, blank=True)
    category = models.CharField(max_length=80, blank=True)
    duration_weeks = models.PositiveIntegerField(default=0)
    scrum_overview = models.TextField(blank=True)
    approach = models.TextField(blank=True)
    deliverables = models.TextField(blank=True)
    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)
    meta_image = models.ImageField(upload_to="projects/meta/", blank=True, null=True)

    def __str__(self):
        return self.title


class ProjectGalleryImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="gallery")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="projects/gallery/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title or self.image_url


class BlogPost(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    category = models.CharField(max_length=80, blank=True)
    author = models.CharField(max_length=120, blank=True)
    published_date = models.DateField(null=True, blank=True)
    reading_time = models.PositiveIntegerField(default=5)
    featured = models.BooleanField(default=False)
    hero_image = models.ImageField(upload_to="blog/hero/", blank=True, null=True)
    hero_image_url = models.URLField(blank=True)

    def __str__(self):
        return self.title


class BlogGalleryImage(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="gallery")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="blog/gallery/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title or self.image_url


class BlogCarouselItem(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="carousel")
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to="blog/carousel/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title or self.image_url


class BlogReview(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="reviews")
    reviewer_name = models.CharField(max_length=120)
    rating = models.PositiveIntegerField(default=5)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reviewer_name


class Testimonial(models.Model):
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other"),
    ]
    name = models.CharField(max_length=120)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="other")
    country = models.CharField(max_length=80, blank=True)
    state = models.CharField(max_length=80, blank=True)
    city = models.CharField(max_length=80, blank=True)
    role = models.CharField(max_length=120, blank=True)
    review = models.TextField()
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class ContactSubmission(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
