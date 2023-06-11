<template>
  <div class="tour-card border rounded-[20px]">
    <img
      v-if="item.image"
      :src="item.image"
      alt=""
      class="w-full h-[21rem] object-cover"
    />
    <div class="px-6 py-4 font-medium">
      <h3 v-if="item.name" class="pb-3">{{ item.name }}</h3>
      <h6 v-if="item.days && item.nights">
        {{ item.days }} วัน {{ item.nights }} คืน
      </h6>
      <h5 v-if="item.price" class="py-4 text-primary-blue font-semibold">
        ฿{{ parseFloat(item.price).toLocaleString() }}
      </h5>
      <Button
        label="ดูรายละเอียด"
        rounded
        class="!bg-primary-blue !border-none !font-normal"
        @click="openNewRoute(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps([
  "item",
  "management",
  "nameValidate",
  "airlineValidate",
  "daysValidate",
  "nightsValidate",
  "priceValidate",
  "countriesValidate",
  "detailsValidate",
  "fileNameValidate",
  "imageObjectURL",
]);

const router = useRouter();

const openNewRoute = async (id) => {
  if (!props.management) {
    router.push(`/tours/${id}`);
  } else {
    console.log(props.item.image);
    const nameValidate = await props.nameValidate();
    const airlineValidate = await props.airlineValidate();
    const daysValidate = await props.daysValidate();
    const nightsValidate = await props.nightsValidate();
    const countriesValidate = await props.countriesValidate();
    const priceValidate = await props.priceValidate();
    const detailsValidate = await props.detailsValidate();
    const fileNameValidate = await props.fileNameValidate();

    if (
      !nameValidate.valid ||
      !airlineValidate.valid ||
      !daysValidate.valid ||
      !nightsValidate.valid ||
      !countriesValidate.valid ||
      !priceValidate.valid ||
      !detailsValidate.valid ||
      !fileNameValidate.valid
    ) {
      return;
    }

    const countries = props.item.countries.map((item) => item.name);

    const previewData = {
      airline: props.item.airline,
      countries: countries.join(", "),
      days: props.item.days,
      details: props.item.details,
      image: props.imageObjectURL,
      name: props.item.name,
      nights: props.item.nights,
      price: props.item.price,
    };

    const url = router.resolve({
      path: "/tours/preview",
      query: previewData,
      target: "_blank",
    });
    window.open(url.href, url.target);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.tour-card {
  border-color: $primary-border-color;

  img {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}

.p-button {
  padding: 0.55rem 1rem;
}
</style>
