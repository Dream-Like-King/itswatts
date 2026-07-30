from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUT = Path(__file__).resolve().parents[1] / "public" / "downloads" / "its-watts-qa-orientation-guide.pdf"
INK = colors.HexColor("#17231B")
GREEN = colors.HexColor("#16843A")
MUTED = colors.HexColor("#59665D")
PALE = colors.HexColor("#E8F3EB")
LINE = colors.HexColor("#D5DDD7")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Kicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=GREEN, spaceAfter=12, tracking=1.2))
styles.add(ParagraphStyle(name="GuideTitle", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=INK, spaceAfter=12))
styles.add(ParagraphStyle(name="GuideSubtitle", parent=styles["Normal"], fontName="Helvetica", fontSize=13, leading=19, textColor=MUTED, spaceAfter=20))
styles.add(ParagraphStyle(name="Section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=GREEN, spaceBefore=15, spaceAfter=8))
styles.add(ParagraphStyle(name="Body", parent=styles["Normal"], fontName="Helvetica", fontSize=10.5, leading=16, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="Small", parent=styles["Normal"], fontName="Helvetica", fontSize=9.5, leading=14, textColor=MUTED, spaceAfter=6))
styles.add(ParagraphStyle(name="CardTitle", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=INK, spaceAfter=4))


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(doc.leftMargin, letter[1] - 0.54 * inch, letter[0] - doc.rightMargin, letter[1] - 0.54 * inch)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, letter[1] - 0.4 * inch, "IT'S WATTS  |  QA ORIENTATION GUIDE")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.4 * inch, f"ITSWATTS.COM  |  {doc.page}")
    canvas.restoreState()


def bullet(text):
    return Paragraph(f"<bullet>&bull;</bullet> {text}", styles["Body"])


def card(title, text):
    table = Table([[Paragraph(title, styles["CardTitle"]), Paragraph(text, styles["Small"])]], colWidths=[1.45 * inch, 4.45 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return KeepTogether([table, Spacer(1, 9)])


story = [
    Spacer(1, 0.78 * inch),
    Paragraph("FREE STARTER GUIDE", styles["Kicker"]),
    Paragraph("Your QA orientation", styles["GuideTitle"]),
    Paragraph("A practical starting point for learning how quality assurance supports people, products, and delivery teams.", styles["GuideSubtitle"]),
    card("Start here", "QA is not just finding bugs at the end. It is the habit of reducing avoidable surprises by asking better questions throughout the work."),
    Paragraph("What QA is", styles["Section"]),
    Paragraph("Quality assurance helps a team understand whether a product works as intended for the people who rely on it. Good QA brings curiosity, product context, risk awareness, and clear communication to every stage of delivery.", styles["Body"]),
    bullet("<b>Quality assurance:</b> preventing avoidable problems by improving the way work is planned, built, tested, and learned from."),
    bullet("<b>Testing:</b> checking behavior to learn whether the product meets expectations and where risk remains."),
    bullet("<b>Quality control:</b> activities that identify defects or gaps in the finished work."),
    Paragraph("Five terms to know", styles["Section"]),
    card("Test case", "A documented set of conditions and steps used to check an expected behavior."),
    card("Defect", "A difference between expected behavior and what the product actually does."),
    card("Regression", "A check that existing behavior still works after a change."),
    card("Risk", "The likelihood and impact of something going wrong for users, the business, or delivery."),
    card("Accessibility", "Designing and testing so people with different abilities can use a product successfully."),
    Paragraph("A practical 30-day starting plan", styles["Section"]),
    card("Week 1 - Learn the language", "Read QA terms, practice writing expected versus actual behavior, and observe how a familiar app handles errors, empty states, and navigation."),
    card("Week 2 - Practice test design", "Choose one small feature. List the happy path, a few ways it could fail, boundary conditions, and questions you would ask before testing."),
    card("Week 3 - Explore with purpose", "Use a short charter such as: explore account creation for new users using only a keyboard. Capture what you learn and why it matters."),
    card("Week 4 - Build a small proof of work", "Write a bug report, a mini test plan, or one readable automated check for a stable workflow. Explain your choices and what risk they address."),
    Paragraph("Tools to explore", styles["Section"]),
    bullet("Browser developer tools for inspecting behavior, network requests, and responsive layouts."),
    bullet("A test management or note-taking tool for organizing questions, scenarios, and findings."),
    bullet("An API client for learning how systems exchange data and handle failure responses."),
    bullet("An automation framework such as Playwright when you are ready to practice repeatable checks."),
    Paragraph("Practice ideas", styles["Section"]),
    bullet("Test a sign-in, search, checkout, or profile-update flow in an app you know well."),
    bullet("Write three clear defects: title, steps, expected behavior, actual behavior, environment, and impact."),
    bullet("Run a keyboard-only pass and record where focus, labels, or messages make the experience harder to use."),
    Paragraph("Career and certification context", styles["Section"]),
    Paragraph("There is no single route into QA. People enter from customer support, development, business analysis, design, and many other backgrounds. The strongest evidence of growth is a combination of practice, communication, product understanding, and a willingness to keep learning.", styles["Body"]),
    card("Certifications", "A foundation-testing credential can provide structure and shared terminology. Treat it as optional evidence of learning, not a replacement for hands-on practice or a guarantee of employment."),
    Paragraph("Your next useful step", styles["Section"]),
    bullet("Use the It’s Watts Knowledge Base when a QA term is unfamiliar."),
    bullet("Choose the Beginner, Intermediate, or Advanced route that best fits your current experience."),
    bullet("Try the QA Toolkits to decide what to automate or generate test ideas from a user story."),
    Paragraph("Keep learning in public. Test with purpose.", styles["GuideSubtitle"]),
]


OUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(OUT), pagesize=letter, leftMargin=0.82 * inch, rightMargin=0.82 * inch, topMargin=0.82 * inch, bottomMargin=0.7 * inch, title="It's Watts QA Orientation Guide", author="Derrick Watson")
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(OUT)
