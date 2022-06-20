import { UserRecipesWidget } from "../recipe/UserRecipesWidget";
import { Layout } from "./shared/Layout";

export const HomeScreen = () => {
    return (
        <Layout>
            <div className="HOME-BODY p-4 lg:px-16 lg:py-4 flex justify-center">
                <UserRecipesWidget />
            </div>
        </Layout>
    );
}