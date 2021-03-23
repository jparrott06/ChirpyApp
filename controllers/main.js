
const app = Vue.createApp(
    {
        data() {
            return {
                keyword: '',
                result: null,
                index: 0,
                total: null
            }
        },
        methods: {
            searchGoogleBooks() {

                var txtSearch = document.querySelector("#txtSearch")

                if(txtSearch.value == "") {
                    document.querySelector("#errorDiv").classList.remove("invisible")
                    document.querySelector("#errorDiv").classList.add("hasError")
                    document.querySelector("#errorDiv").innerHTML = "No search keyword provided..."
                    this.index = 0
                    this.keyword = ""
                    this.result = null
                    this.total = null
                    return;

                }

                document.querySelector("#errorDiv").classList.add("invisible")
                document.querySelector("#errorDiv").classList.remove("hasError")
                document.querySelector("#errorDiv").innerHTML = ""

                this.index = 0
                fetch('https://www.googleapis.com/books/v1/volumes/?q=' + this.keyword + "&startIndex=" + this.index + "&maxResults=20")
                    .then(response => response.json())
                    .then(json => this.result = json)
                    .then(json => this.total = json)
            },
            NextsearchGoogleBooks() {
                
                this.index += 20
                console.log(this.index)
                fetch('https://www.googleapis.com/books/v1/volumes/?q=' + this.keyword + "&startIndex=" + this.index + "&maxResults=20")
                    .then(response => response.json())
                    .then(json => this.result = json)
            },
            PrevsearchGoogleBooks() {

                this.index -=20
                console.log(this.index)
                fetch('https://www.googleapis.com/books/v1/volumes/?q=' + this.keyword + "&startIndex=" + this.index + "&maxResults=20")
                    .then(response => response.json())
                    .then(json => this.result = json)
            },
            reset() {
                this.index = 0
                this.keyword = ''
                this.result = null
                this.total = null
                document.querySelector("#errorDiv").classList.remove("hasError")
                document.querySelector("#errorDiv").innerHTML = ""
                document.querySelector("#errorDiv").classList.add("invisible")
            }
        }

    })