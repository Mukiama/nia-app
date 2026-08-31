"""update user and user place models

Revision ID: 75c70e0060bf
Revises: 5a0be5d14fb1
Create Date: 2026-08-31 06:54:07.163970

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "75c70e0060bf"
down_revision = "5a0be5d14fb1"
branch_labels = None
depends_on = None


def upgrade():
    # ---------------------------------------------------------
    # PLACES
    # Rename Picture -> picture without deleting the data
    # ---------------------------------------------------------
    with op.batch_alter_table("places", schema=None) as batch_op:
        batch_op.alter_column(
            "Picture",
            new_column_name="picture",
            existing_type=sa.String(),
            existing_nullable=True,
        )

    # ---------------------------------------------------------
    # USER_PLACES
    # Add the new UserPlace fields safely
    # ---------------------------------------------------------
    with op.batch_alter_table("user_places", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                "visited",
                sa.Boolean(),
                nullable=False,
                server_default=sa.false(),
            )
        )

        batch_op.add_column(
            sa.Column(
                "rating",
                sa.Integer(),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "created_at",
                sa.DateTime(timezone=True),
                nullable=True,
            )
        )

        batch_op.add_column(
            sa.Column(
                "updated_at",
                sa.DateTime(timezone=True),
                nullable=True,
            )
        )

        batch_op.alter_column(
            "visited_at",
            existing_type=sa.DATETIME(),
            nullable=True,
        )

    # ---------------------------------------------------------
    # USERS
    # Rename password -> _password_hash
    # ---------------------------------------------------------
    #
    # We first add the new column as nullable so existing
    # records do not break during migration.
    #
    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                "_password_hash",
                sa.String(),
                nullable=True,
            )
        )

        batch_op.create_unique_constraint(
            "uq_users_email",
            ["email"],
        )

    # Copy existing password values into _password_hash.
    #
    # IMPORTANT:
    # This assumes the existing password column already contains
    # password hashes. If it contains plain-text passwords,
    # STOP before upgrading and we will handle them differently.
    op.execute(
        """
        UPDATE users
        SET _password_hash = password
        WHERE _password_hash IS NULL
        """
    )

    # Now that existing rows have values, make the new column
    # non-nullable and remove the old column.
    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.alter_column(
            "_password_hash",
            existing_type=sa.String(),
            nullable=False,
        )

        batch_op.drop_column("password")

    # ---------------------------------------------------------
    # PROFILES
    # Preserve the existing profiles table.
    # Only add the unique constraint if the model requires it.
    # ---------------------------------------------------------
    with op.batch_alter_table("profiles", schema=None) as batch_op:
        batch_op.create_unique_constraint(
            "uq_profiles_user_id",
            ["user_id"],
        )

    # ---------------------------------------------------------
    # Populate timestamps for existing UserPlace records
    # ---------------------------------------------------------
    op.execute(
        """
        UPDATE user_places
        SET created_at = CURRENT_TIMESTAMP
        WHERE created_at IS NULL
        """
    )

    op.execute(
        """
        UPDATE user_places
        SET updated_at = CURRENT_TIMESTAMP
        WHERE updated_at IS NULL
        """
    )

    # Make timestamps required after existing records have values.
    with op.batch_alter_table("user_places", schema=None) as batch_op:

        batch_op.alter_column(
            "created_at",
            existing_type=sa.DateTime(timezone=True),
            nullable=False,
        )

        batch_op.alter_column(
            "updated_at",
            existing_type=sa.DateTime(timezone=True),
            nullable=False,
        )


def downgrade():

    # ---------------------------------------------------------
    # USER_PLACES
    # ---------------------------------------------------------
    with op.batch_alter_table("user_places", schema=None) as batch_op:

        batch_op.alter_column(
            "visited_at",
            existing_type=sa.DATETIME(),
            nullable=False,
        )

        batch_op.drop_column("updated_at")
        batch_op.drop_column("created_at")
        batch_op.drop_column("rating")
        batch_op.drop_column("visited")

    # ---------------------------------------------------------
    # USERS
    # ---------------------------------------------------------
    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                "password",
                sa.String(),
                nullable=True,
            )
        )

    op.execute(
        """
        UPDATE users
        SET password = _password_hash
        WHERE password IS NULL
        """
    )

    with op.batch_alter_table("users", schema=None) as batch_op:

        batch_op.alter_column(
            "password",
            existing_type=sa.String(),
            nullable=False,
        )

        batch_op.drop_constraint(
            "uq_users_email",
            type_="unique",
        )

        batch_op.drop_column("_password_hash")

    # ---------------------------------------------------------
    # PROFILES
    # ---------------------------------------------------------
    with op.batch_alter_table("profiles", schema=None) as batch_op:
        batch_op.drop_constraint(
            "uq_profiles_user_id",
            type_="unique",
        )

    # ---------------------------------------------------------
    # PLACES
    # ---------------------------------------------------------
    with op.batch_alter_table("places", schema=None) as batch_op:
        batch_op.alter_column(
            "picture",
            new_column_name="Picture",
            existing_type=sa.String(),
            existing_nullable=True,
        )
