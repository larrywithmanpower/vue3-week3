
const app = Vue.createApp({
    data() {
        return {
            apiPath: 'larry',
            apiUrl: 'https://vue3-course-api.hexschool.io',
            user: {
                username: '',
                password: ''
            },
            errModal: ''
        }
    },
    methods: {
        login() {
            const url = `${this.apiUrl}/admin/signin`;

            axios.post(url ,this.user)
                .then((res) => {
                    if (res.data.success) {
                        // ! 重構取得token與expired
                        const {token, expired} = res.data;
                        // ! 存取token至cookie
                        document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
                        // ! 移動畫面
                        window.location = 'product.html';
                    } else {
                        errModal.show();
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    mounted() {
        errModal = new bootstrap.Modal(document.querySelector('#errModal'));
    },
}).mount('#app');