from django.contrib import admin
from django import forms
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from django_ckeditor_5.widgets import CKEditor5Widget
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


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ("company_name", "tagline", "email")


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Service)
class ServiceAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(ServiceDetail)
class ServiceDetailAdmin(admin.ModelAdmin):
    list_display = ("service", "cta_text", "meta_title")


class ServiceSectionForm(forms.ModelForm):
    rich_body = forms.CharField(widget=CKEditor5Widget(config_name="default"), required=False)

    class Meta:
        model = ServiceSection
        fields = "__all__"


@admin.register(ServiceSection)
class ServiceSectionAdmin(SortableAdminMixin, admin.ModelAdmin):
    form = ServiceSectionForm
    list_display = ("service", "title", "section_type", "order")
    list_editable = ("order",)
    list_filter = ("section_type",)


@admin.register(ServiceFAQ)
class ServiceFAQAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("service", "question", "order")
    list_editable = ("order",)


@admin.register(ServiceGalleryImage)
class ServiceGalleryImageAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("service", "title", "order")
    list_editable = ("order",)


@admin.register(ServiceCarouselItem)
class ServiceCarouselItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("service", "title", "order")
    list_editable = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "client", "category", "duration_weeks", "completion_date")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(ProjectGalleryImage)
class ProjectGalleryImageAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("project", "title", "order")
    list_editable = ("order",)


class BlogPostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(config_name="default"), required=False)

    class Meta:
        model = BlogPost
        fields = "__all__"


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostForm
    list_display = ("title", "slug", "category", "author", "published_date", "featured")
    list_filter = ("category", "featured")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(BlogGalleryImage)
class BlogGalleryImageAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("post", "title", "order")
    list_editable = ("order",)


@admin.register(BlogCarouselItem)
class BlogCarouselItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("post", "title", "order")
    list_editable = ("order",)


@admin.register(BlogReview)
class BlogReviewAdmin(admin.ModelAdmin):
    list_display = ("post", "reviewer_name", "rating", "created_at")
    list_filter = ("rating",)


@admin.register(Testimonial)
class TestimonialAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ("name", "country", "city", "order")
    list_editable = ("order",)


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "created_at")
    readonly_fields = ("created_at",)
