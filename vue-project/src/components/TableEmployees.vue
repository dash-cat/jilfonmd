<template>
  <div class="main-window">
    <div class="info">
      <div class="name-company">Жилфонд</div>
      <div class="title">Пользователь</div>
    </div>
    <div>
      <div class="side-bar">
        <div class="search-container">
          <div class="annotation">Поиск сотрудников</div>
          <input v-model="searchText" placeholder="Введите Id или имя" />
          <div class="annotation">Результаты</div>
          <div v-if="!filteredUsers" class="result-search">
            ничего не найдено
          </div>
          <div v-if="searchText === ''" class="result-search">
            начните поиск
          </div>
          <div v-else class="cards">
            <div
              class="card"
              @click="pickUser(user)"
              v-for="user in filteredUsers"
              :key="user.id"
            >
              <div>
                <img src="../assets/img.png" />
              </div>
              <div class="card-name-email">
                <div class="card-name">{{ user?.username }}</div>
                <div class="card-email">{{ user?.email }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="user">
          <div v-if="!selectUser" class="user-text-default">
            Выберите сотрудника, чтобы посмотреть его профиль
          </div>
          <div v-if="selectUser" class="user-container">
            <div>
              <img src="../assets/default-img.png" alt="" />
            </div>
            <div class="user-container-description">
              <div class="user-container-name">{{ selectUser?.name }}</div>
              <div class="user-container-data">
                <span>email:</span>&nbsp;{{ selectUser?.email }}
              </div>
              <div class="user-container-data">
                <span>phone:</span>&nbsp;{{ selectUser?.phone }}
              </div>
              <div class="user-container-title">О себе:</div>
              <div class="user-container-about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { store } from "../store";
export default {
  data() {
    return {
      selectUser: null,
      searchText: "",
      user: {},
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
    filteredUsers() {
      return this.users.filter((user) => {
        const words = this.searchText.split(/,[ ]*/);
        for (const word of words) {
          const id = String(user.id) === String(word);
          let comparison;
          if (word !== "") {
            comparison = user.username.includes(word);
          }
          if (comparison || id) {
            return true;
          }
        }
        return false;
      });
    },
  },
  methods: {
    pickUser(user) {
      this.selectUser = user;
    },
  },

  async mounted() {
    store.dispatch("fetchUsers");
  },
};
</script>

<style lang="scss" scoped>
$background: #fdfdfd;
$title-color: #333333;
$company-color: #e31f24;
$white-color: #ffffff;
$side-bar-color: #fdfdfd;
$name-color: #000000;
$text-default: #76787d;

%Montserrat {
  font-family: "Montserrat";
  font-style: normal;
}
%title {
  @extend %Montserrat;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  color: $title-color;
}

.main-window {
  @extend %Montserrat;
  display: flex;
  background: $background;
  height: 100vh;
  flex-direction: column;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name-company {
    @extend %Montserrat;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: $company-color;
    margin: 46px 0px 30px 0px;
  }

  .title {
    @extend %Montserrat;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: $title-color;
  }

  .side-bar {
    display: flex;
    width: 1266px;
    height: 575px;
    background: $side-bar-color;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    .search-container {
      width: 290px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 10px;

      input {
        background: $white-color;
        border: 1.5px solid #e9ecef;
        border-radius: 8px;
        width: 240px;
        height: 49px;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        gap: 16px;
      }
      .annotation {
        @extend %title;
        margin-top: 19px;
      }
      .cards {
        overflow: scroll;
        display: flex;
        gap: 18px;
        flex-direction: column;
      }
      .card {
        display: flex;
        align-items: center;
        background: $white-color;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        cursor: pointer;
        margin: 3px;
        &-name-email {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: space-around;
          padding: 20px;
        }
        &-name-email:hover {
          background: #e0e0e0;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          border-radius: 0px 10px 10px 0px;
        }
        &-name {
          @extend %Montserrat;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: $title-color;
        }
        &-email {
          @extend %Montserrat;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: $text-default;
        }
      }
    }
  }

  .user {
    width: 1266px;
    height: 575px;
    background: $side-bar-color;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    &-text-default {
      @extend %Montserrat;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: $text-default;
    }

    &-container {
      height: 100%;
      display: flex;
      width: 100%;
      margin-left: 26px;
      margin-top: 33px;

      &-description {
        color: $name-color;
        margin-left: 61px;
        gap: 10px;
        display: flex;
        flex-direction: column;
      }
      &-name {
        @extend %Montserrat;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        color: $name-color;
      }
      &-data {
        @extend %Montserrat;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        color: $title-color;
        span {
          font-weight: 600;
        }
      }
      &-about {
        width: 439px;
      }
      &-title {
        @extend %Montserrat;
        font-weight: 600;
        font-size: 16px;
        line-height: 140%;
        color: $title-color;
      }
    }
  }
}
</style>
