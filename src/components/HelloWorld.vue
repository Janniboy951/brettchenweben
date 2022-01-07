<template>
  <table class="topnavbar">
    <tr>
      <td>Brettchenweb-Tool</td>
      <td class="leftAlign">
        <FileReader @load="gotImage"></FileReader>
        <button class="topnav">Exportieren</button>
      </td>
      <td>
        <button class="topnav" @click="addNewLine">Neue Reihe laden</button>
        <button class="topnav" @click="removeLastLine">
          Letzte Reihe löschen
        </button>
      </td>
      <td>
        <button class="topnav" @click="usePreviousArrows()">
          Vorherige Pfeile laden</button
        ><button class="topnav" @click="useNextArrows()">
          Nächste Pfeile laden
        </button>
      </td>
      <td>
        <button class="topnav" @click="arrowsInvert">Pfeile invertieren</button
        ><button class="topnav" @click="arrowsUp">Pfeile nach oben</button>
      </td>
      <td>
        <button class="topnav" @click="console.log(1)">
          Muster herunterladen</button
        ><button class="topnav" @click="downloadArrows()">
          Pfeile herunterladen
        </button>
      </td>
    </tr>
  </table>

  <!-- <p><FileReader @load="gotImage"></FileReader></p>
  <p>
    <button @click="arrowsInvert">Pfeile invertieren</button
    ><button @click="arrowsUp">Pfeile nach oben</button>
  </p>
  <p>
    <button @click="addNewLine">Neue Reihe laden</button>
    <button @click="removeLastLine">Letzte Reihe löschen</button>
  </p> -->
  <table class="brettchenTable">
    <tr>
      <td
        v-for="(_, index) in parseInt(rowLength)"
        :key="index"
        @click="toggleDirection(index)"
      >
        <img
          v-if="toTurn[0][index] == 'up'"
          src="../assets/arrow-up-solid.svg"
          alt="&uarr;"
          :test="index"
          :style="{ width: 50 / rowLength + 'vw' }"
        />
        <img
          v-if="toTurn[0][index] == 'down'"
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
        :style="{ height: 98 / row.length + 'vw' }"
      >
        <div
          class="parallelogram"
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
            transform: 'skew(' + (tilt_dir[index_1] == 'S' ? -10 : 10) + 'deg)',
          }"
        >
          <span
            :style="{
              transform:
                'skew(' + (tilt_dir[index_1] == 'S' ? 10 : -10) + 'deg)',
            }"
            >{{
              currentState[index] != null ? currentState[index][index_1] : ""
            }}</span
          >
        </div>
      </td>
    </tr>
    <tr>
      <td v-for="(row, index) in tilt_dir" :key="index">{{ row }}</td>
    </tr>
  </table>
</template>

<script lang="ts" src="@/scripts/Brettchenweben.ts">
</script>

<style src="@/styles/Brettchenweben.css">
</style>
