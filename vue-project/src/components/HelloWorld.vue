<template>
  <div class="main-window">
    <div class="info">
      <div class="name-company">Жилфонд</div>
      <div class="title">Пользователь</div>
    </div>
    <div>
      <div class="side-bar">
        <div class="search-container">
          <div class="anotation">Поиск сотрудников</div>
          <input v-model="search" placeholder="Anna" />
          <div class="anotation">Результаты</div>
          <div v-if="result" class="result-search">ничего не найдено</div>
          <div class="cards" v-else>
            <div class="box-search" v-for="user in searchOfName" :key="user.id">
              <div>
                <img src="../assets/img.png"/>
              </div>
              <div class="name-email">
                <div class="search-name">{{ user?.name }}</div>
                <div 
                @click="selectUser()"
                class="search-email">{{ user?.email }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="user">
          <div v-if="user" class="text-default">
            Выберите сотрудника, чтобы посмотреть его профиль
          </div>
          <div v-for="user in users" :key="user.id" class="container-info">
            <div>
              <img src="" alt="" />
            </div>
            <div class="description">
              <div class="user-name">{{ user?.name }}</div>
              <div class="e-mail">{{ user?.email }}</div>
              <div class="user-about">{{ user?.about }}</div>
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
      selectUser: {},
      search: "",
      user: {},
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
    searchOfName() {
      return this.users.filter((user) => {
        const words = this.search.split(/,[ ]*/)
        for(const word of words) {
          const kakhochesh = user.name.includes(word)
          if (kakhochesh) {
            return true
          }
        }
       return false
      });
    },
  },

  async mounted() {
    store.dispatch("fetchUsers");
  },
};
</script>

<style lang="scss" scoped>
$background: #f5f5f5;
%title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  color: #333333;
}

.main-window {
  display: flex;
  width: 100vh;
  background: $background;
  height: 100vh;
  flex-direction: column;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name-company {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #e31f24;
  }

  .title {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #333333;
  }

  .side-bar {
    display: flex;
    width: 1266px;
    height: 575px;
    background: #fdfdfd;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    .text-default {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #76787d;
    }
    .search-container {
      width: 290px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      gap: 10px;

      input {
        background: #ffffff;
        border: 1.5px solid #e9ecef;
        border-radius: 8px;
        width: 240px;
        height: 49px;
        display: flex;
        align-items: center;
        padding: 16px 24px;
        gap: 16px;
      }
      .anotation {
        @extend %title;
      }
      .cards {
        overflow: scroll;
        display: flex;
        gap: 18px;
        flex-direction: column;
      }
      .box-search {
        display: flex;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        cursor: pointer;
        .name-email {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: space-around;
          padding: 20px;
          :hover {
            background: #e0e0e0;
          }

          .search-name {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
            color: #333333;
          }
          .search-email {
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: #76787d;
          }
        }
      }
    }
  }

  .user {
    width: 1266px;
    height: 575px;
    background: #fdfdfd;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
}
</style>
