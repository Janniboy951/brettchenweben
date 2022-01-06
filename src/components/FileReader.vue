<template>
  <label class="text-reader">
    <input type="file" @change="loadTextFromFile" />
  </label>
</template>

<script>
import { PNG } from "pngjs";
export default {
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        new PNG({ filterType: 4 }).parse(
          e.target.result,
          function (error, image) {
            if (error) {
              return;
            }
            let imgPx = [];
            for (let i = 0; i < image.height; i++) {
              let imgPxRow = [];
              for (let j = 0; j < image.width; j++) {
                imgPxRow.push([
                  image.data[(i * image.width + j) * 4],
                  image.data[(i * image.width + j) * 4 + 1],
                  image.data[(i * image.width + j) * 4 + 2],
                  image.data[(i * image.width + j) * 4 + 3],
                ]);
              }
              imgPx.push(imgPxRow);
            }

            this.$emit("load", imgPx);
          }.bind(this)
        );
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
</script>