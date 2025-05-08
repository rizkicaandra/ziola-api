-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "application_code" CHAR(3),

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permission" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_role_id" INTEGER,
    "user_module_code" VARCHAR(5),
    "user_submodule_code" VARCHAR(5),
    "action" JSON,

    CONSTRAINT "user_permission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_application_code_fkey" FOREIGN KEY ("application_code") REFERENCES "application"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_module_code_fkey" FOREIGN KEY ("user_module_code") REFERENCES "user_module"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_submodule_code_fkey" FOREIGN KEY ("user_submodule_code") REFERENCES "user_submodule"("code") ON DELETE SET NULL ON UPDATE CASCADE;
