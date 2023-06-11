<template>
  <nav class="navbar text-primary-blue relative z-10">
    <div class="flex justify-between items-center py-4 px-3 md:px-0">
      <div class="flex items-center lg:ml-20">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-20 sm:w-auto"
        >
        <h4
          class="sm:text-3xl ml-4 self-center font-semibold w-40 text-primary-blue"
        >
          Wellness Life Travel
        </h4>
      </div>
      <div
        class="hidden md:flex md:justify-center md:items-center sm:gap-8 lg:gap-16 xl:gap-28"
      >
        <router-link
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :to="menuItem.route"
          class="py-0 mx-2 hover:opacity-70"
        >
          {{ menuItem.label }}
        </router-link>
      </div>

      <div
        v-if="!isLoggedIn"
        class="hidden lg:flex items-center bg-primary-blue w-60 h-20 pl-4 pr-2 rounded-l-[5rem] justify-around"
      >
        <a
          v-for="(social, index) in socialLinks"
          :key="index"
          :href="social.url"
          class="text-white hover:text-gray-400 ml-4"
        >
          <font-awesome-icon
            :icon="social.icon"
            size="2xl"
          />
        </a>
      </div>
      <div
        v-if="isLoggedIn"
        class="hidden md:flex md:items-center pr-4"
      >
        <Avatar
          class="mr-2 !bg-primary-blue text-white cursor-pointer"
          size="large"
          shape="circle"
          @click="toggle"
        >
          <font-awesome-icon :icon="['far', 'user']" />
        </Avatar>
        <Menu
          id="overlay_menu"
          ref="adminMenu"
          :popup="true"
        >
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
              @click="logout"
            >
              <font-awesome-icon :icon="['fas', 'sign-out']" />
              <span class="ml-2">Logout</span>
            </div>
          </template>
        </Menu>
      </div>
      <div class="md:hidden">
        <button
          class="flex items-center space-x-2 focus:outline-none"
          @click="showMenu = !showMenu"
        >
          <div class="w-9 h-9 flex items-center justify-center relative">
            <span
              :class="showMenu ? 'translate-y-0 rotate-45' : '-translate-y-3'"
              class="hamburger-bar"
            />

            <span
              :class="showMenu ? 'opacity-0 translate-x-3' : 'opacity-100'"
              class="hamburger-bar"
            />

            <span
              :class="showMenu ? 'translate-y-0 -rotate-45' : 'translate-y-3'"
              class="hamburger-bar"
            />
          </div>
        </button>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="showMenu"
        class="md:hidden absolute inset-x-0 top-[115px] bg-[#333] z-20"
        style="height: calc(100vh - 50px)"
      >
        <div class="flex flex-col px-6">
          <router-link
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.route"
            class="py-4 border-b-[1px] border-white/20 !text-white hover:text-gray-300"
            @click="showMenu = !showMenu"
          >
            {{ item.label }}
          </router-link>
          <div
            v-if="isLoggedIn"
            class="py-4"
          >
            <Button
              label="Logout"
              @click="logout"
            />
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "@/store";

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
  { icon: ["fab", "square-facebook"], url: "www.facebook.com" },
  { icon: ["fab", "instagram"], url: "www.instagram.com" },
  { icon: ["fab", "twitter"], url: "www.twitter.com" },
]);

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

.router-link-active {
  border-bottom: 2px solid $secondary-color;
}
</style>
