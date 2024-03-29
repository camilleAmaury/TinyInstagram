package foo;
import java.io.IOException;
import java.sql.Time;
import java.sql.Timestamp;
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
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.gson.Gson;
import com.google.appengine.repackaged.com.google.datastore.v1.Projection;
import com.google.appengine.repackaged.com.google.datastore.v1.PropertyFilter;

@WebServlet(name = "GetPosts", urlPatterns = { "/getposts" })
public class GetPosts extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Integer n = -1;
        Integer min = 1;
        Integer max = 2;
        if(request.getParameter("n") != null && !request.getParameter("n").isEmpty()){
            n = Integer.parseInt(request.getParameter("n"));
        }else {
            min = Integer.parseInt(request.getParameter("min"));
            max = Integer.parseInt(request.getParameter("max"));
        }

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);


        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();





        if(n != -1){
            Query q = new Query("post");
            q.addSort("date", Query.SortDirection.DESCENDING);
            PreparedQuery pq = datastore.prepare(q);
            List<Entity> result = pq.asList(FetchOptions.Builder.withLimit(n));
            String[][] res = {{}};
            Gson gson = new Gson();
            if (result.size() > 0) {
                res = new String[result.size()][8];
                int i = 0;
                for (Entity entity : result) {
                    res[i][0] = getTheKeyValue(entity.getKey().toString(), "post");
                    res[i][1] = entity.getProperty("date").toString();
                    res[i][2] = entity.getProperty("description").toString();
                    res[i][3] = getTheKeyValue(entity.getProperty("id_user").toString(), "user");
                    res[i][4] = entity.getProperty("picture").toString();
                    res[i][5] = entity.getProperty("tags").toString();
                    Key grpKey = KeyFactory.createKey("user", Long.parseLong(res[i][3]));
                    Query q2 = new Query("user").setFilter(new FilterPredicate("__key__", FilterOperator.EQUAL, grpKey));
                    PreparedQuery pq2 = datastore.prepare(q2);
                    List<Entity> result2 = pq2.asList(FetchOptions.Builder.withDefaults());
                    res[i][6] = "Unknown";
                    res[i][7] = "Unknown";
                    if (result2.size() > 0) {
                        res[i][6] = result2.get(0).getProperty("firstName").toString();
                        res[i][7] = result2.get(0).getProperty("lastName").toString();
                    }

                    i++;

                }
            }

            response.getWriter().print(gson.toJson(res));
        }else {
            Calendar calendarTwoAgo = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            calendarTwoAgo.add(Calendar.DATE, min);
            Calendar calendarAgo = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            calendarAgo.add(Calendar.DATE, max);

            Date dmin = calendarTwoAgo.getTime();
            Date dmax = calendarAgo.getTime();
            // create query targeting post entity
            Query q = new Query("post");

            //create filters on date property
            FilterPredicate beginDateFilter = new FilterPredicate("date", FilterOperator.GREATER_THAN_OR_EQUAL, dmin);
            FilterPredicate endDateFilter = new FilterPredicate("date", FilterOperator.LESS_THAN_OR_EQUAL, dmax);

            ArrayList<Filter> filters = new ArrayList<Filter>();

            filters.add(beginDateFilter);
            filters.add(endDateFilter);

            CompositeFilter searchFilters = new CompositeFilter(CompositeFilterOperator.AND, filters);
            q.setFilter(searchFilters);

            q.addSort("date", Query.SortDirection.DESCENDING);

            List<Entity> result = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());

            String[][] res = {{}};
            Gson gson = new Gson();
            if (result.size() > 0) {
                res = new String[result.size()][8];
                int i = 0;
                for (Entity entity : result) {
                    res[i][0] = getTheKeyValue(entity.getKey().toString(), "post");
                    res[i][1] = entity.getProperty("date").toString();
                    res[i][2] = entity.getProperty("description").toString();
                    res[i][3] = getTheKeyValue(entity.getProperty("id_user").toString(), "user");
                    res[i][4] = entity.getProperty("picture").toString();
                    res[i][5] = entity.getProperty("tags").toString();
                    Key grpKey = KeyFactory.createKey("user", Long.parseLong(res[i][3]));
                    Query q2 = new Query("user").setFilter(new FilterPredicate("__key__", FilterOperator.EQUAL, grpKey));
                    PreparedQuery pq2 = datastore.prepare(q2);
                    List<Entity> result2 = pq2.asList(FetchOptions.Builder.withDefaults());
                    res[i][6] = "Unknown";
                    res[i][7] = "Unknown";
                    if (result2.size() > 0) {
                        res[i][6] = result2.get(0).getProperty("firstName").toString();
                        res[i][7] = result2.get(0).getProperty("lastName").toString();
                    }

                    i++;

                }
            }

            response.getWriter().print(gson.toJson(res));
        }
    }

    String getTheKeyValue(String key, String type){
        return key.replace("(","").replace(")","").replace(type, "");
    }
}
