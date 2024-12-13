# Step 1: Define the Product
class Report:
    def __init__(self):
        self.title = None
        self.data = None
        self.visualizations = []
        self.format = None

    def __str__(self):
        return (f"Report: {self.title}\n"
                f"Data: {self.data}\n"
                f"Visualizations: {', '.join(self.visualizations)}\n"
                f"Format: {self.format}\n")

# Step 2: Create the Builder Interface
class ReportBuilder:
    def set_title(self, title):
        raise NotImplementedError

    def set_data(self, data):
        raise NotImplementedError

    def add_visualization(self, visualization):
        raise NotImplementedError

    def set_format(self, format):
        raise NotImplementedError

    def get_report(self):
        raise NotImplementedError

# Step 3: Implement Concrete Builders
class PDFReportBuilder(ReportBuilder):
    def __init__(self):
        self.report = Report()

    def set_title(self, title):
        self.report.title = title

    def set_data(self, data):
        self.report.data = data

    def add_visualization(self, visualization):
        self.report.visualizations.append(visualization)

    def set_format(self, format):
        self.report.format = "PDF"

    def get_report(self):
        return self.report

class ExcelReportBuilder(ReportBuilder):
    def __init__(self):
        self.report = Report()

    def set_title(self, title):
        self.report.title = title

    def set_data(self, data):
        self.report.data = data

    def add_visualization(self, visualization):
        self.report.visualizations.append(visualization)

    def set_format(self, format):
        self.report.format = "Excel"

    def get_report(self):
        return self.report

# Step 4: Create the Director
class ReportDirector:
    def __init__(self, builder):
        self.builder = builder

    def construct_basic_report(self, title, data):
        self.builder.set_title(title)
        self.builder.set_data(data)
        self.builder.set_format("Basic")

    def construct_detailed_report(self, title, data, visualizations):
        self.builder.set_title(title)
        self.builder.set_data(data)
        for viz in visualizations:
            self.builder.add_visualization(viz)
        self.builder.set_format("Detailed")

# Step 5: Client Code
if __name__ == "__main__":
    # Use the PDF Builder
    pdf_builder = PDFReportBuilder()
    director = ReportDirector(pdf_builder)

    # Construct a basic report
    director.construct_basic_report("Sales Report Q1", "Sales Data Q1")
    basic_pdf_report = pdf_builder.get_report()
    print(basic_pdf_report)

    # Construct a detailed report
    director.construct_detailed_report(
        "Sales Report Q1 Detailed",
        "Sales Data Q1",
        ["Bar Chart", "Pie Chart", "Line Graph"]
    )
    detailed_pdf_report = pdf_builder.get_report()
    print(detailed_pdf_report)

    # Use the Excel Builder
    excel_builder = ExcelReportBuilder()
    director = ReportDirector(excel_builder)

    # Construct a detailed Excel report
    director.construct_detailed_report(
        "Sales Report Q1 Detailed",
        "Sales Data Q1",
        ["Pivot Table", "Histogram"]
    )
    detailed_excel_report = excel_builder.get_report()
    print(detailed_excel_report)
