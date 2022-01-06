<template>
  <p><FileReader @load="gotImage"></FileReader></p>
  <p>
    <button @click="arrowsInvert">Pfeile invertieren</button
    ><button @click="arrowsUp">Pfeile nach oben</button>
  </p>
  <p>
    <button @click="addNewLine">Neue Reihe laden</button>
    <button @click="removeLastLine">Letzte Reihe löschen</button>
  </p>
  <table class="brettchenTable">
    <tr>
      <td
        v-for="(_, index) in parseInt(rowLength)"
        :key="index"
        @click="toggleDirection(index)"
      >
        <img
          v-if="toTurn[index] == 'up'"
          src="../assets/arrow-up-solid.svg"
          alt="&uarr;"
          :test="index"
          :style="{ width: 50 / rowLength + 'vw' }"
        />
        <img
          v-if="toTurn[index] == 'down'"
          src="../assets/arrow-down-solid.svg"
          alt="&darr;"
          :style="{ width: 50 / rowLength + 'vw' }"
        />
      </td>
    </tr>
    <tr v-for="(row, index) in img" :key="index">
      <td
        v-for="(cell_color, index_1) in row"
        :key="index_1"
        :style="{
          background:
            'rgba(' +
            cell_color[0] +
            ',' +
            cell_color[1] +
            ',' +
            cell_color[2] +
            ',' +
            cell_color[3] +
            ')',
          height: 98 / row.length + 'vw',
        }"
      >
        {{ currentState[index] != null ? currentState[index][index_1] : "" }}
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, toHandlerKey } from "vue";
import FileReader from "./FileReader.vue";

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      text: "",
      img: [] as any[],
      rowLength: 0,
      toTurn: [] as string[],
      currentState: [[]] as number[][],
    };
  },
  components: {
    FileReader,
  },
  methods: {
    gotImage(img: any) {
      // console.log(img);
      this.img = img;
      this.rowLength = img[0].length;
      for (let i = 0; i <= this.rowLength; i++) {
        this.toTurn.push("up");
        this.currentState[0].push(3);
      }
    },
    toggleDirection(index: number) {
      if (this.toTurn[index] == "up") {
        this.toTurn[index] = "down";
      } else {
        this.toTurn[index] = "up";
      }
      console.log(index);
    },
    arrowsInvert() {
      for (let i = 0; i <= this.rowLength; i++) {
        this.toggleDirection(i);
      }
    },
    arrowsUp() {
      for (let i = 0; i <= this.rowLength; i++) {
        this.toTurn[i] = "up";
      }
    },
    removeLastLine() {
      if (this.img.length > 4) {
        this.img.shift();
        console.log(this.currentState);
        this.currentState.shift();
        console.log(this.currentState);
      }
    },
    addNewLine() {
      let newLine = [];
      this.currentState.splice(1, 0, this.currentState[0].slice(0));
      for (let i = 0; i < this.rowLength; i++) {
        if (this.toTurn[i] == "up") {
          this.currentState[0][i]++;
          if (this.currentState[0][i] >= 4) {
            this.currentState[0][i] = 0;
          }
        } else {
          this.currentState[0][i]--;
          console.log(this.currentState[0][i]);
          if (this.currentState[0][i] <= -1) {
            this.currentState[0][i] = 4 - Math.abs(this.currentState[0][i]);
          }
          console.log(
            this.currentState[0][i].toString() +
              "  " +
              i.toString() +
              this.toTurn.toString()
          );
        }
        console.log(
          "Col: " +
            i.toString() +
            "  State: " +
            this.currentState[0][i].toString() +
            " DTA:" +
            (this.img.length - this.currentState[0][i]).toString()
        );
        newLine.push(
          this.img[this.img.length - this.currentState[0][i] - 1][i]
        );
      }
      this.img.unshift(newLine);

      // console.log(this.toTurn);
      console.log(this.currentState);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brettchenTable {
  width: 98vw;
  margin: 1vw;
  background-color: white;
  border-collapse: collapse;
}
.brettchenTable tr td {
  height: 1cm;
  border: none;
}
</style>
