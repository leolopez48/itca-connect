<template>
  <div data-app>
    <v-card class="p-3 mt-3">
      <v-container>
        <h2>{{ title }}</h2>
        <div class="options-table">
          <base-button type="primary" title="Agregar" @click="addRecord()" />
        </div>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pl-0 pb-0 pr-0">
          <v-text-field
            class="mt-3"
            variant="outlined"
            label="Buscar"
            type="text"
            v-model="search"
          ></v-text-field>
        </v-col>
      </v-container>
      <v-data-table-server
        :headers="headers"
        :items-length="total"
        :items="records"
        :loading="loading"
        item-title="id"
        item-value="id"
        @update:options="getDataFromApi"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            size="20"
            class="mr-2"
            @click="editItem(item.raw)"
            icon="mdi-pencil"
          />
          <v-icon
            size="20"
            class="mr-2"
            @click="deleteItem(item.raw)"
            icon="mdi-delete"
          />
        </template>
        <template v-slot:no-data>
          <v-icon @click="initialize" icon="mdi-refresh" />
        </template>
      </v-data-table-server>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          <h2 class="mx-auto pt-3 mb-3 text-center black-secondary">
            {{ formTitle }}
          </h2>
        </v-card-title>

        <v-card-text>
          <v-container>
            <!-- Form -->
            <v-row class="pt-3">
               
        <!-- name -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Name"
                v-model="v$.editedItem.name.$model"
                :rules="v$.editedItem.name"
                />
            </v-col>
        <!-- name -->

        
        <!-- carnet -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Carnet"
                v-model="v$.editedItem.carnet.$model"
                :rules="v$.editedItem.carnet"
                />
            </v-col>
        <!-- carnet -->

        
        <!-- email -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Email"
                v-model="v$.editedItem.email.$model"
                :rules="v$.editedItem.email"
                />
            </v-col>
        <!-- email -->

        
        <!-- name -->
            <v-col cols="12" sm="12" md="4">
                <base-select-search
                    label="Name"
                    v-model.trim="v$.editedItem.name.$model"
                    :items="role"
                    item="name"
                    :rules="v$.editedItem.name"
                />
            </v-col>
        <!-- name -->

        
        <!-- name -->
            <v-col cols="12" sm="12" md="4">
                <base-select-search
                    label="Name"
                    v-model.trim="v$.editedItem.name.$model"
                    :items="career"
                    item="name"
                    :rules="v$.editedItem.name"
                />
            </v-col>
        <!-- name -->

        
        <!-- ip -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Ip"
                v-model="v$.editedItem.ip.$model"
                :rules="v$.editedItem.ip"
                />
            </v-col>
        <!-- ip -->

        
        <!-- email_verified_at -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Email Verified At"
                v-model="v$.editedItem.email_verified_at.$model"
                :rules="v$.editedItem.email_verified_at"
                />
            </v-col>
        <!-- email_verified_at -->

        
        <!-- password -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Password"
                v-model="v$.editedItem.password.$model"
                :rules="v$.editedItem.password"
                />
            </v-col>
        <!-- password -->

        
        <!-- remember_token -->
            <v-col cols="12" sm="12" md="4">
                <base-input
                label="Remember Token"
                v-model="v$.editedItem.remember_token.$model"
                :rules="v$.editedItem.remember_token"
                />
            </v-col>
        <!-- remember_token -->

        
            </v-row>
            <!-- Form -->
            <v-row>
              <v-col align="center">
                <base-button type="primary" title="Guardar" @click="save" />
                <base-button
                  class="ms-1"
                  type="secondary"
                  title="Cancelar"
                  @click="close"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card class="h-100">
        <v-container>
          <h1 class="black-secondary text-center mt-3 mb-3">
            Eliminar registro
          </h1>
          <v-row>
            <v-col align="center">
              <base-button
                type="primary"
                title="Confirmar"
                @click="deleteItemConfirm"
              />
              <base-button
                class="ms-1"
                type="secondary"
                title="Cancelar"
                @click="closeDelete"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
import { useVuelidate } from "@vuelidate/core";
import { messages } from "@/utils/validators/i18n-validators";
import { helpers, minLength, required, email } from "@vuelidate/validators";


import userApi from "@/services/userApi";

import roleApi from "@/services/roleApi";

import careerApi from "@/services/careerApi";


import BaseButton from "../components/base-components/BaseButton.vue";
import BaseInput from "../components/base-components/BaseInput.vue";
import BaseSelect from "../components/base-components/BaseSelect.vue";
import useAlert from "../composables/useAlert";

const { alert } = useAlert();
const langMessages = messages["es"].validations;

export default {
  components: { BaseButton, BaseInput, BaseSelect },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      search: "",
      selected: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        
		{ title: "Name", key: "name" },
		{ title: "Carnet", key: "carnet" },
		{ title: "Email", key: "email" },
		{ title: "Ip", key: "ip" },
		{ title: "Email Verified At", key: "email_verified_at" },
		{ title: "Password", key: "password" },
		{ title: "Remember Token", key: "remember_token" },
        { title: "ACCIONES", key: "actions", sortable: false },
      ],
      records: [],
      editedIndex: -1,
      title: "User",
      total: 0,
      options: {},
      editedItem: {
        		name: "",		carnet: "",		email: "",		name: "",		name: "",		ip: "",		email_verified_at: "",		password: "",		remember_token: "",
      },
      defaultItem: {
        		name: "",		carnet: "",		email: "",		name: "",		name: "",		ip: "",		email_verified_at: "",		password: "",		remember_token: "",
      },
      loading: false,
      debounce: 0,
      role: [],
career: [],

    };
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  // Validations
  validations() {
    return {
      editedItem: {
        name: {
		required,
		minLength: minLength(1),
},carnet: {
		required,
		minLength: minLength(1),
},email: {
		required,
		minLength: minLength(1),
},name: {
		required,
		minLength: minLength(1),
},
name: {
		required,
		minLength: minLength(1),
},
ip: {
		required,
		minLength: minLength(1),
},email_verified_at: {
		required,
		minLength: minLength(1),
},password: {
		required,
		minLength: minLength(1),
},remember_token: {
		required,
		minLength: minLength(1),
},
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },

  watch: {
    search(val) {
      this.getDataFromApi();
    },
    dialog(val) {
      val || this.close();
    },
    dialogBlock(val) {
      val || this.closeBlock();
    },
  },

  created() {
    this.initialize();
  },

  beforeMount() {
    this.getDataFromApi({ page: 1, itemsPerPage: 10, sortBy: [], search: "" });
  },

  methods: {
    async initialize() {
      this.loading = true;
      this.records = [];

      let requests = [
        this.getDataFromApi(),
        roleApi.get(null, {
		params: { itemsPerPage: -1 },
	}),careerApi.get(null, {
		params: { itemsPerPage: -1 },
	}),
      ];

      const responses = await Promise.all(requests).catch((error) => {
        alert.error("No fue posible obtener el registro.");
      });

      if (responses) {
        this.role = responses[1].data.role;
this.career = responses[2].data.career;

      }

      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.records.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        alert.error("Campos obligatorios");
        return;
      }

      // Updating record
      if (this.editedIndex > -1) {
        const edited = Object.assign(
          this.records[this.editedIndex],
          this.editedItem
        );

        try {
          const { data } = await userApi.put(`/${edited.id}`, edited);

          alert.success(data.message);
        } catch (error) {
          alert.error("No fue posible actualizar el registro.");
        }

        this.close();
        this.initialize();
        return;
      }

      //Creating record
      try {
        const { data } = await userApi.post(null, this.editedItem);

        alert.success(data.message);
      } catch (error) {
        alert.error("No fue posible crear el registro.");
      }

      this.close();
      this.initialize();
      return;
    },

    deleteItem(item) {
      this.editedIndex = this.records.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialogDelete = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async deleteItemConfirm() {
      try {
        const { data } = await userApi.delete(`/${this.editedItem.id}`, {
          params: {
            id: this.editedItem.id,
          },
        });

        alert.success(data.message);
      } catch (error) {
        this.close();
      }

      this.initialize();
      this.closeDelete();
    },

    getDataFromApi(options) {
      this.loading = true;
      this.records = [];

      //debounce
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        try {
          const { data } = await userApi.get(null, {
            params: { ...options, search: this.search },
          });

          this.records = data.data;
          this.total = data.total;
          this.loading = false;
        } catch (error) {
          alert.error("No fue posible obtener los registros.");
        }
      }, 500);
    },

    addRecord() {
      this.dialog = true;
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.v$.$reset();
    },
  },
};
</script>