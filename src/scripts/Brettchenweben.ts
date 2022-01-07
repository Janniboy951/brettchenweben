import { defineComponent } from "vue";
import FileReader from "@/components/FileReader.vue";
import { jsPDF } from "jspdf";

type TiltDir = "S" | "Z";
type ArrowDir = "up" | "down";

export default defineComponent({
  name: "HelloWorld",
  metaInfo: {
    title: "Brettchenweben-Tool",
  },
  data() {
    return {
      text: "",
      img: [] as any[],
      rowLength: 0,
      toTurn: [[]] as ArrowDir[][],
      currentState: [[]] as number[][],
      useToTurnRow: 1,
      tilt_dir: [
        "S",
        "Z",
        "Z",
        "Z",
        "Z",
        "Z",
        "Z",
        "Z",
        "S",
        "S",
        "S",
        "S",
        "Z",
        "Z",
        "Z",
        "Z",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "Z",
        "Z",
        "Z",
        "Z",
        "Z",
        "Z",
        "S",
        "S",
        "S",
        "S",
        "Z",
        "Z",
        "Z",
        "Z",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "S",
        "Z",
      ] as TiltDir[],
    };
  },
  components: {
    FileReader,
  },
  mounted() {
    document.title = "Brettchenweben";
  },
  methods: {
    gotImage(img: any) {
      // console.log(img);
      this.img = img;
      this.rowLength = img[0].length;
      for (let i = 0; i <= this.rowLength; i++) {
        this.toTurn[0].push("up");
        this.currentState[0].push(3);
      }
    },
    toggleDirection(index: number) {
      if (this.toTurn[0][index] == "up") {
        this.toTurn[0][index] = "down";
      } else {
        this.toTurn[0][index] = "up";
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
        this.toTurn[0][i] = "up";
      }
    },
    removeLastLine() {
      if (this.img.length > 4) {
        this.img.shift();
        // console.log(this.currentState);
        this.currentState.shift();
        // console.log(this.currentState);
      }
    },
    usePreviousArrows() {
      if (this.useToTurnRow < this.toTurn.length - 1) {
        this.useToTurnRow++;
      }
      this.toTurn[0] = this.toTurn[this.useToTurnRow];
    },
    useNextArrows() {
      if (this.useToTurnRow > 1) {
        this.useToTurnRow--;
      }
      this.toTurn[0] = this.toTurn[this.useToTurnRow];
    },
    downloadArrows() {
      // 210*297
      const doc = new jsPDF();
      const arrowSize = 190 / this.rowLength;
      for (let j = 0; j < this.toTurn.length; j++) {
        for (let i = 0; i < this.toTurn[0].length; i++) {
          if (this.toTurn[j][i] == "up") {
            doc.triangle(
              10 + arrowSize * 0.15 + arrowSize * i,
              10 + arrowSize * 1.5 * j,
              10 + arrowSize * 0.85 + arrowSize * i,
              10 + arrowSize * 1.5 * j,
              10 + arrowSize * 0.5 + arrowSize * i,
              10 - arrowSize * 0.85 + arrowSize * 1.5 * j,
              "FD"
            );
          } else {
            doc.triangle(
              10 + arrowSize * 0.15 + arrowSize * i,
              10 - arrowSize * 0.85 + arrowSize * 1.5 * j,
              10 + arrowSize * 0.85 + arrowSize * i,
              10 - arrowSize * 0.85 + arrowSize * 1.5 * j,
              10 + arrowSize * 0.5 + arrowSize * i,
              10 + arrowSize * 1.5 * j,
              "FD"
            );
          }
        }
      }

      doc.save("Brettchenweben_Pfeile.pdf");
    },
    addNewLine() {
      const newLine = [];
      this.currentState.splice(1, 0, this.currentState[0].slice(0));
      for (let i = 0; i < this.rowLength; i++) {
        if (
          (this.toTurn[0][i] == "up" && this.tilt_dir[i] == "Z") ||
          (this.toTurn[0][i] == "down" && this.tilt_dir[i] == "S")
        ) {
          this.currentState[0][i]++;
          if (this.currentState[0][i] >= 4) {
            this.currentState[0][i] = 0;
          }
        } else {
          this.currentState[0][i]--;
          // console.log(this.currentState[0][i]);
          if (this.currentState[0][i] <= -1) {
            this.currentState[0][i] = 4 - Math.abs(this.currentState[0][i]);
          }
        }
        newLine.push(
          this.img[this.img.length - this.currentState[0][i] - 1][i]
        );
      }
      this.img.unshift(newLine);
      this.toTurn.splice(1, 0, this.toTurn[0].slice(0));
      this.useToTurnRow = 1;
      // console.log(this.toTurn);
      // console.log(this.currentState);
    },
  },
});
