<template>
  <div class="tour-card border rounded-[20px]">
    <img
      v-if="item.image"
      :src="item.id ? item.image : item.image.objectURL"
      alt=""
      class="w-full"
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
        @click="openNewRoute(item.id)"
        label="ดูรายละเอียด"
        rounded
        class="!bg-primary-blue !border-none !font-normal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["item"]);

const router = useRouter();

const openNewRoute = (id) => {
  if (id) {
    router.push(`/tours/${id}`);
  } else {
    const countries = props.item.countries.map((item) => item.name);

    const previewData = ref({
      airline: props.item.airline,
      countries: countries.join(", "),
      days: props.item.days,
      details: props.item.details,
      image: props.item.image.objectURL,
      name: props.item.name,
      nights: props.item.nights,
      price: props.item.price,
    });

    const url = router.resolve({
      path: "/tours/preview",
      query: previewData.value,
    }).href;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
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
