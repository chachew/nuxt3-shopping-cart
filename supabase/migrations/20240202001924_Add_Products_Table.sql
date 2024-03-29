create table "public"."products" (
    "_id" bigint generated by default as identity not null,
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "brand" character varying,
    "description" character varying,
    "price" bigint not null,
    "img" text,
    "inventory" bigint,
    "show_inventory" boolean not null default true,
    "weight_ounces" bigint not null default '0'::bigint,
    "dimensions" text,
    "metadata" jsonb,
    "sku" character varying,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone
);


alter table "public"."products" enable row level security;

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (_id);

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."products"
as permissive
for delete
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."products"
as permissive
for select
to public
using (true);



