require 'rails_helper'

describe Api::V1::UsersController, type: :controller do
    let!(:admin) { User.create(email: "admin@mail.com", password: "password", username: "admin") }

    describe "GET#index" do
        it "should return an empty json object if no user is signed in" do
            get :index
            
            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json).to eq({})
        end

        it "should return the current user object when signed in" do
            sign_in admin

            get :index

            returned_json = JSON.parse(response.body)

            expect(response.status).to eq 200
            expect(response.content_type).to eq("application/json; charset=utf-8")

            expect(returned_json["user"]["id"]).to eq(admin.id)
            expect(returned_json["user"]["username"]).to eq(admin.username)
        end

    end

end