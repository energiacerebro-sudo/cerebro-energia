from django.core.management.base import BaseCommand
from core.models import Testimonial


class Command(BaseCommand):
    help = "Seed testimonials."

    def handle(self, *args, **options):
        testimonials = [
            {
                "name": "Aarav Mehta",
                "gender": "male",
                "country": "India",
                "state": "Maharashtra",
                "city": "Mumbai",
                "role": "Founder",
                "review": "Sharp execution and clean delivery. Our product shipped on time.",
            },
            {
                "name": "Priya Nair",
                "gender": "female",
                "country": "India",
                "state": "Karnataka",
                "city": "Bengaluru",
                "role": "Product Lead",
                "review": "Great communication and strong UX instincts.",
            },
            {
                "name": "Carlos Sánchez",
                "gender": "male",
                "country": "Spain",
                "state": "Madrid",
                "city": "Madrid",
                "role": "CTO",
                "review": "Reliable engineering partner with clear sprint cadence.",
            },
            {
                "name": "Maya Al Habsi",
                "gender": "female",
                "country": "UAE",
                "state": "Dubai",
                "city": "Dubai",
                "role": "Operations Director",
                "review": "Our platform stability improved dramatically after launch.",
            },
            {
                "name": "James Carter",
                "gender": "male",
                "country": "United States",
                "state": "Texas",
                "city": "Houston",
                "role": "CEO",
                "review": "Excellent delivery and strong attention to product detail.",
            },
            {
                "name": "Sophie Tremblay",
                "gender": "female",
                "country": "Canada",
                "state": "Ontario",
                "city": "Toronto",
                "role": "VP Engineering",
                "review": "Trusted team with a practical, outcome‑driven approach.",
            },
            {
                "name": "Lukas Weber",
                "gender": "male",
                "country": "Germany",
                "state": "Bavaria",
                "city": "Munich",
                "role": "Product Manager",
                "review": "Strong collaboration and very clear technical guidance.",
            },
            {
                "name": "Elena Rossi",
                "gender": "female",
                "country": "Italy",
                "state": "Lazio",
                "city": "Rome",
                "role": "Design Lead",
                "review": "Design and engineering stayed aligned from start to finish.",
            },
        ]

        Testimonial.objects.all().delete()
        for t in testimonials:
            Testimonial.objects.create(**t)

        self.stdout.write(self.style.SUCCESS("Seeded testimonials."))
