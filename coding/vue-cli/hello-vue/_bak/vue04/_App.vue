<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>Input Form</h4>
                        </div>
                        <div class="panel-body">
                            <p>
                                <label for="fullname">Full Name:</label><br>
                                <input type="text" name="fullname" id="fullname" value="" class="form-control" v-model="userData.fullname">
                            </p>
                             <p>
                                <label for="email">Mail: </label><br>
                                <input type="email" name="email" id="email" value="" class="form-control" v-model="userData.email">
                            </p>
                             <p>
                                <label for="password">Password: </label><br>
                                <input type="password" name="password" id="password" value="" class="form-control" v-model="userData.password">
                            </p>
                            <div>
                                <label for="password">Store in Database? </label>
                                <ul>
                                    <li><label for="yes"><input type="radio" name="store" id="yes" value="Yes" v-model="userData.store">Yes</label></li>
                                    <li><label for="no"><input type="radio" name="store" id="no" value="No" v-model="userData.store">No</label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Exercise 1 -->
                    <!-- Create a Signup Form where you retrieve the following Information -->
                    <!-- Full Name (First Name + Last Name) -->
                    <!-- Mail -->
                    <!-- Password -->
                    <!-- Store Data? Yes/No -->

                    <!-- Exercise 2 -->
                    <!-- Only display the Form if it has NOT been submitted -->
                    <!-- Display the Data Summary ONCE the Form HAS been submitted -->

                    <!-- Exercise 3 -->
                    <!-- Edit the Example from above and create a custom "Full Name" Control -->
                    <!-- which still holds the First Name and Last Name Input Field -->
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button @click.prevent="submitEvent" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
        <hr>
        <div class="row" v-if="isSumit">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>Your Data</h4>
                    </div>
                    <div class="panel-body">
                        <p>Full Name: {{ userData.fullname }}</p>
                        <p>Mail: {{ userData.email }}</p>
                        <p>Password: {{ userData.password }}</p>
                        <p>Store in Database?: {{ userData.store }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userData: {
                    fullname: '',
                    email: '',
                    password: '',
                    store: 'Yes'
                },
                isSumit: false
            }
        },
        methods: {
            submitEvent() {
                this.isSumit = true;
            },
        },
    }
</script>

<style>
</style>
