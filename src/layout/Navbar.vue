<template>
  <nav
    class="navbar text-primary-blue relative z-10 md:h-28 md:flex md:items-center">
    <div
      class="flex justify-between items-center py-4 sm:py-0 px-4 md:px-0 md:w-full">
      <div
        class="flex items-center lg:ml-20 cursor-pointer"
        @click="$router.push('/')">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-12 sm:w-20" />
        <div>
          <h4
            class="text-lg sm:text-2xl md:text-2xl lg:text-xl xl:text-2xl ml-4 self-center font-semibold w-[12rem] sm:w-[15rem] lg:w-[12rem] xl:w-[15rem] 2xl:w-[18rem] text-primary-blue">
            Wellness Life Travel
          </h4>
          <h5
            class="text-sm sm:text-md md:text-md lg:text-sm 2xl:text-md ml-4 self-center font-semibold w-[11rem] sm:w-[15rem] lg:w-[12rem] xl:w-[15rem] 2xl:w-[18rem] text-primary-blue">
            เวลเนส ไลฟ์ ทราเวล
          </h5>
        </div>
      </div>
      <div
        class="hidden md:flex md:justify-center md:items-center sm:gap-8 lg:gap-16 xl:gap-28">
        <router-link
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :to="menuItem.route"
          class="py-0 mx-2 hover:opacity-70">
          {{ menuItem.label }}
        </router-link>
      </div>

      <div
        v-if="!isLoggedIn"
        class="hidden lg:flex items-center bg-primary-blue w-60 h-20 pl-4 pr-2 rounded-l-[5rem] justify-around">
        <div
          v-for="(social, index) in socialLinks"
          :key="index"
          class="text-white cursor-pointer hover:text-gray-400 ml-4"
          @click="handleClick(social.name, social.url)">
          <font-awesome-icon
            :icon="social.icon"
            :class="index === 2 ? 'text-[1.65em]' : 'text-[2em]'" />
        </div>
      </div>
      <div
        v-if="isLoggedIn"
        class="hidden md:flex md:items-center pr-4">
        <Avatar
          class="mr-2 !bg-primary-blue text-white cursor-pointer"
          size="large"
          shape="circle"
          @click="toggle">
          <font-awesome-icon :icon="['far', 'user']" />
        </Avatar>
        <Menu
          id="overlay_menu"
          ref="adminMenu"
          :popup="true">
          <template #start>
            <div class="menu-item">
              <div class="flex flex-col">
                <span class="font-bold">{{ user.email }}</span>
                <span class="text-sm">Admin</span>
              </div>
            </div>
          </template>
          <template #end>
            <div
              class="menu-item hover:bg-neutral-100 hover:cursor-pointer"
              @click="logout">
              <font-awesome-icon :icon="['fas', 'sign-out']" />
              <span class="ml-2">Logout</span>
            </div>
          </template>
        </Menu>
      </div>
      <div class="md:hidden">
        <button
          class="flex items-center space-x-2 focus:outline-none"
          aria-label="Open Menu"
          @click="showMenu = !showMenu">
          <div class="w-7 h-7 flex items-center justify-center relative">
            <span
              :class="
                showMenu ? 'translate-y-0 rotate-45' : '-translate-y-[0.65rem]'
              "
              class="hamburger-bar" />

            <span
              :class="
                showMenu ? 'opacity-0 translate-x-[0.65rem]' : 'opacity-100'
              "
              class="hamburger-bar" />

            <span
              :class="
                showMenu ? 'translate-y-0 -rotate-45' : 'translate-y-[0.65rem]'
              "
              class="hamburger-bar" />
          </div>
        </button>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="showMenu"
        class="md:hidden absolute inset-x-0 top-[83px] bg-[#333] z-20"
        style="height: calc(100vh - 50px)">
        <div class="flex flex-col px-6">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            class="py-4 border-b-[1px] border-white/20 !text-white hover:text-gray-300"
            @click="showMenu = !showMenu">
            {{ item.label }}
          </router-link>
          <div
            v-if="isLoggedIn"
            class="py-4">
            <Button
              label="Logout"
              class="!bg-primary-blue !border-none"
              @click="logout" />
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "@/store";
import { makePhoneCall } from "@/utils/GlobalFunction";
import { facebook, phone, instagram } from "@/utils/VueGtag";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Menu from "primevue/menu";

const showMenu = ref(false);
const adminMenu = ref();

const menuItems = ref([
  {
    label: "หน้าแรก",
    route: "/",
  },
  {
    label: "แพ็คเกจทัวร์",
    route: "/tours",
  },
  {
    label: "ติดต่อเรา",
    route: "/contact",
  },
]);

const socialLinks = ref([
  {
    icon: ["fab", "square-facebook"],
    name: "facebook",
    url: "https://www.facebook.com/wellnesslifetravel",
  },
  {
    icon: ["fab", "instagram"],
    name: "instagram",
    url: "https://www.instagram.com/wellnesslifetravel",
  },
  { icon: ["fas", "phone"], name: "phone", url: "tel:0932392359" },
]);

const handleClick = (name, link) => {
  switch (name) {
    case "facebook":
      facebook("contact");
      window.open(link, "_blank");
      break;
    case "instagram":
      instagram("contact");
      window.open(link, "_blank");
      break;
    case "phone":
      phone("contact");
      makePhoneCall();
      break;
    default:
      break;
  }
};

const logout = () => {
  store.dispatch("logout");
  localStorage.removeItem("token");
  showMenu.value = !showMenu.value;
};

const toggle = (event) => {
  adminMenu.value.toggle(event);
};

const isLoggedIn = computed(() => store.state.isLoggedIn);
const user = computed(() => store.state.user);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@media screen and (min-width: 768px) {
  .router-link-exact-active {
    border-bottom: 2px solid $secondary-color;
  }
}
</style>
