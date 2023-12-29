<template>
  <div>
    <button @click="downloadFile">Download File</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // Define reactive variables or functions using ref
    const fileName = ref('your-file.pdf'); // Replace with your actual file name
    const filePath = ref(`/path/to/your/files/${fileName.value}`); // Replace with the correct file path

    // Function to handle file download
    const downloadFile = () => {
      // Create a link element
      const link = document.createElement('a');
      link.href = filePath.value;
      link.download = fileName.value;

      // Trigger a click event on the link
      document.body.appendChild(link);
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    };

    // Return variables and functions for use in the template
    return {
      fileName,
      filePath,
      downloadFile,
    };
  },
};
</script>

<style>
/* Your component styles go here */
</style>