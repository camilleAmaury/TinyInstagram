package foo;
import java.io.IOException;
import java.util.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.KeyRange;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.PropertyProjection;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;
import com.google.appengine.repackaged.com.google.datastore.v1.CompositeFilter;
import com.google.appengine.repackaged.com.google.datastore.v1.Projection;
import com.google.appengine.repackaged.com.google.datastore.v1.PropertyFilter;

@WebServlet(name = "Login", urlPatterns = { "/login" })
public class Login extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query q = new Query("user")
                .setFilter(CompositeFilterOperator.and(
                        new FilterPredicate("email", FilterOperator.EQUAL, email),
                        new FilterPredicate("password", FilterOperator.EQUAL, Security.getMd5(password))));
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> result = pq.asList(FetchOptions.Builder.withDefaults());
        Gson gson = new Gson();
        String[] res = new String[4];
        if(result.size() == 1){
            res[0] = "1";
            res[1] = getTheKeyValue(result.get(0).getKey().toString(), "user");
            res[2] = result.get(0).getProperty("firstName").toString();
            res[3] = result.get(0).getProperty("lastName").toString();
        }else{
            res[0] = "0";
            res[1] = "Mot de passe ou email incorrect.";
            res[2] = "";
            res[3] = "";
        }
        response.getWriter().print(gson.toJson(res));

    }

    String getTheKeyValue(String key, String type){
        return key.replace("(","").replace(")","").replace(type, "");
    }

}