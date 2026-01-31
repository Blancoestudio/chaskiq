require "rails_helper"

RSpec.describe ApplicationController, type: :controller do
  controller do
    def index
      render plain: "locale: #{I18n.locale}"
    end
  end

  let(:app) { FactoryBot.create(:app) }

  before do
    allow(controller).to receive(:current_app).and_return(app)
    # Mocking @app instance variable as it might be set in a before_action not covered here
    # or ApplicationController might rely on a method to find the app.
    # Looking at ApplicationController, it seems @app is likely set by multitenancy middleware or similar,
    # or the controller finds it.
    # But `set_locale` uses `@app`.
    controller.instance_variable_set(:@app, app)
  end

  describe "#set_locale" do
    context "when HTTP_LANG header is present" do
      it "sets locale from header" do
        request.headers["HTTP_LANG"] = "es"
        get :index
        expect(I18n.locale).to eq(:es)
      end
    end

    context "when HTTP_LANG header is missing" do
      context "when app has default_lang" do
        before do
          app.update(default_lang: "fr")
          # Re-set instance variable as the object might need reloading or be fresh per request
          controller.instance_variable_set(:@app, app) 
        end

        it "sets locale from app default_lang" do
          get :index
          expect(I18n.locale).to eq(:fr)
        end
      end

      context "when app has no default_lang" do
        it "sets default locale" do
          app.update(default_lang: nil)
          get :index
          expect(I18n.locale).to eq(I18n.default_locale)
        end
      end
    end

    context "when HTTP_LANG header is present but invalid" do
        it "falls back to app default" do
            app.update(default_lang: "de")
            request.headers["HTTP_LANG"] = "xx" # invalid
            controller.instance_variable_set(:@app, app)
            get :index
            expect(I18n.locale).to eq(:de)
        end
    end
  end
end
