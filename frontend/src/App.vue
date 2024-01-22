<template>
  <main>
    <div class="wrapper">
      <div class="content-upload">
        <input type="file" name="file" id="file" ref="files"
               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
      </div>

      <button @click="submitFile" class="btn btn-info">Carregar</button>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Bar
  }
  methods: {
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.$refs.files.files[0]);

      axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.success) {

        }
      }).catch(function (xhr) {
        console.log('Falha: ', xhr.message);
      });
    }
  }
};
</script>
