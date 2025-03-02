import SwiftUI
import MapKit

// Step 1: Define the Target Interface
// This is the clean SwiftUI-friendly interface that the app wants to use.
struct MapDisplayView: View {
    var coordinate: CLLocationCoordinate2D

    var body: some View {
        // This is the SwiftUI-friendly interface, but it's powered by an adapted UIKit map view.
        MapViewAdapter(coordinate: coordinate)
            .frame(height: 300)
    }
}

// Step 2: Identify the Adaptee
// This is the existing UIKit component — it’s a legacy MKMapView that we can't directly use in SwiftUI.
class LegacyMapView: MKMapView {
    func setCenterCoordinate(_ coordinate: CLLocationCoordinate2D) {
        setCenter(coordinate, animated: true)
    }
}

// Step 3: Implement the Adapter
// The adapter makes the UIKit view (LegacyMapView) usable within SwiftUI.
struct MapViewAdapter: UIViewRepresentable {
    var coordinate: CLLocationCoordinate2D

    // This is the actual UIView creation — here we return the LegacyMapView.
    func makeUIView(context: Context) -> LegacyMapView {
        let mapView = LegacyMapView()
        return mapView
    }

    // This updates the view whenever SwiftUI state changes — in this case, it centers the map.
    func updateUIView(_ uiView: LegacyMapView, context: Context) {
        uiView.setCenterCoordinate(coordinate)
    }
}

// Step 4: Client Interaction
// The app's main SwiftUI view works directly with MapDisplayView, unaware of the UIKit component underneath.
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Location Map")
                .font(.headline)

            // Using the SwiftUI-friendly wrapper, fully adapted to work seamlessly.
            MapDisplayView(coordinate: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194))
        }
    }
}

// Example app entry point (needed if this is the full file for a SwiftUI app)
@main
struct AdapterExampleApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}