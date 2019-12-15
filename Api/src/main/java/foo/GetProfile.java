package foo;

import com.google.appengine.api.datastore.*;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet(name = "GetProfile", urlPatterns = { "/getprofile" })
public class GetProfile extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id_user = request.getParameter("id_user");

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        Key keyUser1 = KeyFactory.createKey("user", Long.parseLong(id_user));

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

        Query q = new Query("follow").setFilter(new Query.FilterPredicate("id2", Query.FilterOperator.EQUAL, keyUser1));

        Query q2 = new Query("follow").setFilter(new Query.FilterPredicate("id1", Query.FilterOperator.EQUAL, keyUser1));

        Query q3 = new Query("user").setFilter(new Query.FilterPredicate("__key__", Query.FilterOperator.EQUAL, keyUser1));

        PreparedQuery pq = datastore.prepare(q);
        List<Entity> result = pq.asList(FetchOptions.Builder.withDefaults());

        PreparedQuery pq2 = datastore.prepare(q2);
        List<Entity> result2 = pq2.asList(FetchOptions.Builder.withDefaults());

        PreparedQuery pq3 = datastore.prepare(q3);
        List<Entity> result3 = pq3.asList(FetchOptions.Builder.withDefaults());

        Gson gson = new Gson();
        String[] resFollower = new String[result.size()];
        for(int i = 0; i<result.size(); i++){
            resFollower[i] = getTheKeyValue(result.get(i).getProperty("id1").toString(), "user");
        }
        String[][] resFollowerNames = new String[result.size()][2];
        for(int k = 0; k<result.size(); k++){
            String id = getTheKeyValue(result.get(k).getProperty("id1").toString(), "user");
            Key kN = KeyFactory.createKey("user", Long.parseLong(id));
            Query qN = new Query("user").setFilter(new Query.FilterPredicate("__key__", Query.FilterOperator.EQUAL, kN));
            PreparedQuery pqN = datastore.prepare(qN);
            List<Entity> resultN = pqN.asList(FetchOptions.Builder.withDefaults());
            resFollowerNames[k][0] = resultN.get(0).getProperty("firstName").toString();
            resFollowerNames[k][1] = resultN.get(0).getProperty("lastName").toString();
        }
        String[] resFollowed = new String[result2.size()];
        for(int j = 0; j<result2.size(); j++){
            resFollowed[j] = getTheKeyValue(result2.get(j).getProperty("id2").toString(), "user");
        }
        String[][] resFollowedNames = new String[result2.size()][2];
        for(int l = 0; l<result2.size(); l++){
            String id = getTheKeyValue(result2.get(l).getProperty("id2").toString(), "user");
            Key kN = KeyFactory.createKey("user", Long.parseLong(id));
            Query qN = new Query("user").setFilter(new Query.FilterPredicate("__key__", Query.FilterOperator.EQUAL, kN));
            PreparedQuery pqN = datastore.prepare(qN);
            List<Entity> resultN = pqN.asList(FetchOptions.Builder.withDefaults());
            resFollowedNames[l][0] = resultN.get(0).getProperty("firstName").toString();
            resFollowedNames[l][1] = resultN.get(0).getProperty("lastName").toString();
        }

        Query q4 = new Query("post");

        //create filters on date property
        Query.FilterPredicate myPost = new Query.FilterPredicate("id_user", Query.FilterOperator.EQUAL, keyUser1);

        ArrayList<Query.Filter> filters = new ArrayList<Query.Filter>();

        filters.add(myPost);

        List<Entity> result4 = datastore.prepare(q4).asList(FetchOptions.Builder.withDefaults());

        String[][] res = {};
        if(result4.size() > 0) {
            res = new String[result4.size()][8];
            int i = 0;
            for (Entity entity : result4) {
                res[i][0] = getTheKeyValue(entity.getKey().toString(), "post");
                res[i][1] = entity.getProperty("date").toString();
                res[i][2] = entity.getProperty("description").toString();
                res[i][3] = getTheKeyValue(entity.getProperty("id_user").toString(), "user");
                res[i][4] = entity.getProperty("picture").toString();
                res[i][5] = entity.getProperty("tags").toString();
                Key grpKey = KeyFactory.createKey("user", Long.parseLong(res[i][3]));
                Query q5 = new Query("user").setFilter(new Query.FilterPredicate("__key__", Query.FilterOperator.EQUAL, grpKey));
                PreparedQuery pq5 = datastore.prepare(q5);
                List<Entity> result5 = pq5.asList(FetchOptions.Builder.withDefaults());
                res[i][6] = "Unknown";
                res[i][7] = "Unknown";
                if(result5.size() > 0) {
                    res[i][6] = result5.get(0).getProperty("firstName").toString();
                    res[i][7] = result5.get(0).getProperty("lastName").toString();
                }

                i++;

            }
        }

        ArrayList<Object> resFinal = new ArrayList<>();
        resFinal.add(resFollower);
        resFinal.add(resFollowed);
        resFinal.add(res);
        resFinal.add(result3.get(0).getProperty("firstName"));
        resFinal.add(result3.get(0).getProperty("lastName"));
        resFinal.add(resFollowerNames);
        resFinal.add(resFollowedNames);

        response.getWriter().print(gson.toJson(resFinal));


    }
    String getTheKeyValue(String key, String type){
        return key.replace("(","").replace(")","").replace(type, "");
    }

}
