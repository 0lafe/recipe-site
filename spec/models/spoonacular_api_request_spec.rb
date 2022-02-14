require 'rails_helper'

describe SpoonacularApiRequest, type: :model do

    describe "reset" do

        it "clears all entries and creates a new one with a value of zero" do

            SpoonacularApiRequest.reset

            expect(SpoonacularApiRequest.count).to eq(1)
            expect(SpoonacularApiRequest.last.requests).to eq(0)
        
        end

    end

    describe "increase calls" do

        it "creates a new entry x points higher than the last" do

            SpoonacularApiRequest.reset
            SpoonacularApiRequest.increase_calls(10)

            expect(SpoonacularApiRequest.last.requests).to eq(10)

        end

    end

    describe "current" do

        it "gets the current request count" do

            SpoonacularApiRequest.reset
            SpoonacularApiRequest.increase_calls(100)

            expect(SpoonacularApiRequest.current).to eq(100)

        end

    end

    describe "requests_left?" do

        it "returns a boolean denoting if you can make more requests or not" do

            SpoonacularApiRequest.reset
            expect(SpoonacularApiRequest.requests_left?).to eq(true)

            SpoonacularApiRequest.increase_calls(SpoonacularApiRequest.limit + 1)
            expect(SpoonacularApiRequest.requests_left?).to eq(false)

        end

    end

end