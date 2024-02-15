from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("images", "0003_profile_alter_image_owner_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="profile",
            name="premium",
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
