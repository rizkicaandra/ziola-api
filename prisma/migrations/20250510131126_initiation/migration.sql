-- CreateTable
CREATE TABLE "user_status" (
    "code" CHAR(3) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,

    CONSTRAINT "user_status_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "application" (
    "code" CHAR(3) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR(150) NOT NULL,
    "name_en" VARCHAR(150) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user_module" (
    "code" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_id" VARCHAR NOT NULL,
    "name_en" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "user_module_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "user_submodule" (
    "code" VARCHAR(5) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_module_code" VARCHAR(5) NOT NULL,
    "name_id" VARCHAR NOT NULL,
    "name_en" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "user_submodule_pkey" PRIMARY KEY ("code")
);

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

-- CreateTable
CREATE TABLE "user_account" (
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR,
    "updated_by" VARCHAR,
    "name" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "application_code" CHAR(3),
    "role_id" INTEGER,
    "status" CHAR(3),

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_status_name_id_key" ON "user_status"("name_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_status_name_en_key" ON "user_status"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "application_name_id_key" ON "application"("name_id");

-- CreateIndex
CREATE UNIQUE INDEX "application_name_en_key" ON "application"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_phone_key" ON "user_account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_email_key" ON "user_account"("email");

-- AddForeignKey
ALTER TABLE "user_submodule" ADD CONSTRAINT "user_submodule_user_module_code_fkey" FOREIGN KEY ("user_module_code") REFERENCES "user_module"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_application_code_fkey" FOREIGN KEY ("application_code") REFERENCES "application"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_module_code_fkey" FOREIGN KEY ("user_module_code") REFERENCES "user_module"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_submodule_code_fkey" FOREIGN KEY ("user_submodule_code") REFERENCES "user_submodule"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_account" ADD CONSTRAINT "user_account_application_code_fkey" FOREIGN KEY ("application_code") REFERENCES "application"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_account" ADD CONSTRAINT "user_account_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_account" ADD CONSTRAINT "user_account_status_fkey" FOREIGN KEY ("status") REFERENCES "user_status"("code") ON DELETE SET NULL ON UPDATE CASCADE;
