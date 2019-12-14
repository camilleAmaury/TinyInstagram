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
        Integer min = Integer.parseInt(request.getParameter("min"));
        Integer max = Integer.parseInt(request.getParameter("max"));
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);
        Calendar calendarTwoAgo = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        calendarTwoAgo.add(Calendar.DATE, min);
        Calendar calendarAgo = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        calendarAgo.add(Calendar.DATE, max);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

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
        if(result.size() > 0) {

            res = new String[result.size()][6];
            int i = 0;
            for (Entity entity : result) {
                res[i][0] = entity.getKey().toString();
                res[i][1] = entity.getProperty("date").toString();
                res[i][2] = entity.getProperty("description").toString();
                res[i][3] = entity.getProperty("id_user").toString();
                res[i][4] = entity.getProperty("picture").toString();
                res[i][5] = entity.getProperty("tags").toString();
                res[i][6] = entity.getProperty("firstName").toString();
                res[i][7] = entity.getProperty("lastName").toString();
                i++;

            }
        }
        response.getWriter().print(gson.toJson(res));
    }
}
