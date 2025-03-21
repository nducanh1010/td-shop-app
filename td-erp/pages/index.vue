<script setup>
const toast = useToast();
  toast.success("asd");
</script>
<template>
  <v-row>
    <v-col cols="12" md="8"><RevenueCard /></v-col>
    <v-col cols="12" md="4"
      ><total-followers class="mb-6" />
      <total-income />
    </v-col>
    <v-col cols="12" lg="8"><RevenueProducts /></v-col>
    <v-col cols="12" lg="4"><EarningReports /> </v-col>
    <v-col cols="12"><BlogCards /></v-col>
    <v-col class="text-center mt-2">
      <p class="text-muted">
        Design and Developed by
        <a
          flat
          variant="text"
          href="https://wrappixel.com"
          target="_blank"
          class="pl-1 text-primary"
          >wrappixel.com</a
        >
      </p>
    </v-col>
  </v-row>
</template>
