<template>
  <div class="header">
    <div class="header__logo-box">
      <img :src="require('../../assets/images/logo.svg')" alt="logo" />
    </div>
    <div class="header__tabs">
      <div
        :class="{ 'is-active': $route.path === '/upload' }"
        @click="$router.push('/upload')"
        class="header__tab-title"
      >
        UPLOAD
      </div>
      <div
        :class="{ 'is-active': $route.path === '/edit' }"
        class="header__tab-title"
        @click="$router.push('/edit')"
      >
        EDITOR
      </div>
    </div>
    <div class="header__user-settings">
      <div class="header__user-logo">
        <img
          :src="require('../../assets/images/user-logo.svg')"
          alt="user_avatar"
        />
      </div>
      <div class="header__user-name">Jonathan Z.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 53px;
  padding: 0 25px 0 28px;
  background: white;
  box-shadow: 0px -5px 14px rgba(0, 0, 0, 0.25);
  display: flex;
  &__logo-box {
    width: 149px;
    height: 21px;
    margin-top: 20px;
  }
  &__tabs {
    display: flex;
    justify-content: space-between;
    margin-left: 83px;
    height: 100%;
  }
  &__tab-title {
    color: $color--primary;
    font-size: 14px;
    font-weight: 700;
    padding: 20px 17px 0 17px;
    height: 100%;
    user-select: none;
    cursor: pointer;
  }
  &__user-settings {
    display: flex;
    align-items: center;
    position: absolute;
    top: 13px;
    right: 19px;
  }
  &__user-name {
    color: $color--black;
    font-size: 14px;
    font-weight: 700;
    margin-left: 10px;
  }
}
.is-active {
  border-bottom: 4px solid $color--primary;
}
</style>
