<template>
  <div v-loading="isLoadingMockData" class="sidebar">
    <div class="sidebar__header">
      <el-button
        @click="$router.push('/')"
        link
        class="sidebar__header--button"
      >
        <div class="sidebar__header--button__content">
          <img src="@/assets/images/icons/arrow-icon.svg" alt="<-" />
          save and go back
        </div>
      </el-button>
    </div>
    <div class="sidebar__table-box">
      <el-table
        v-if="mockData"
        highlight-current-row
        :data="mockData"
        border
        class="sidebar__table-box--table"
        ref="table"
        :row-class-name="rowClassName"
        :row-key="(e) => e.id"
        :current-row-key="mockData[0].id"
        @current-change="changeDocument"
      >
        <el-table-column
          prop="fileNumber"
          label="Nr."
          width="59"
          class="table-column"
        />
        <el-table-column
          prop="fileLeads"
          label="Leads"
          width="65"
          class="table-column"
        />
        <el-table-column
          prop="fileName"
          label="Publication Name"
          class="table-column"
        />
      </el-table>
      <div class="sidebar__pagination-box">
        <el-button class="sidebar__pagination-box-button">
          <img src="@/assets/images/icons/arrow-left-icon.svg" alt="<-" />
        </el-button>
        <div class="sidebar__pagination-box--middle">
          <div class="sidebar__pagination-box--current">1</div>
          <div class="sidebar__pagination-box--total">/ 1</div>
        </div>
        <el-button class="sidebar__pagination-box-button">
          <img src="@/assets/images/icons/arrow-right-icon.svg" alt="<-" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditorDocumentList",
  computed: {
    ...mapGetters("editor", ["isLoadingMockData", "mockData"]),
  },
  methods: {
    ...mapActions("editor", ["getMockPdfData"]),
    rowClassName(e) {
      return e.row.filePositivity;
    },
    changeDocument(e) {
      this.$emit("change-document", e);
    },
  },
  created() {
    this.getMockPdfData();
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 376px;
  height: calc(100vh - 85px);
  padding-top: 20.5px;
  &__header {
    padding-left: 27.83px;
    &--button {
      color: $color--primary !important;
      font-weight: 700;
      &__content {
        display: flex;
        align-items: center;
        gap: 0 10px;
      }
    }
  }
  &__table-box {
    margin-top: 11.5px;
    width: 100%;
    height: calc(100% - 11.5px);
    background: white;
    border: 1px solid $color--light-gray;
    border-top-right-radius: 6px;
    border-left: none;
    position: relative;
    &:deep(.el-table__header) {
      th {
        font-weight: 700;
        color: $color--black;
        text-align: center;
        &:last-child {
          text-align: left;
          padding-left: 6px;
        }
      }
    }
    &:deep(.el-table__body) {
      tr {
        cursor: pointer;
        &:hover,
        &.current-row {
          td {
            background: rgba(83, 144, 217, 0.14);
            color: $color--black;
            &:first-child {
              margin-left: 0;
            }
          }
        }
        td:not(td:last-child) {
          text-align: center;
        }
        td:last-child .cell {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        &.current-row {
          font-weight: 700;
        }
        &.U td:first-child {
          border-left: 5px solid #a8a7a7;
        }
        &.P td:first-child {
          border-left: 5px solid $color--success;
        }
        &.M td:first-child {
          border-left: 5px solid $color--warning;
        }
      }
    }
    &__table {
      width: 100%;
    }
  }
  &__pagination-box {
    height: 47px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid $color--light-gray;
    padding: 0 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 34px;
      height: 33px;
      opacity: 0.6;
      border-radius: 0;
    }
    &--current {
      width: 29px;
      height: 24px;
      display: flex;
      color: $color--black;
      font-size: 14px;
      justify-content: center;
      align-items: center;
      border: 1px solid $color--light-gray;
      border-radius: 2px;
    }
    &--middle {
      display: flex;
      align-items: center;
    }
    &--total {
      color: $color--black;
      padding-left: 4px;
      font-size: 14px;
    }
  }
}
@media (max-width: 1380px) {
  .sidebar {
    width: 290px;
  }
}
</style>
