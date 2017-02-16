package Ic2ExpReactorPlanner;

/**
 * Represents an overclocked heat vent.
 * @author Brian McCloud
 */
public class OverclockedHeatVent extends ReactorComponent {
    
    /**
     * The filename for the image to show for the component.
     */
    private static final String imageFilename = "reactorVentGold.png";     //NOI18N
    
    public static final MaterialsList MATERIALS = new MaterialsList(ReactorHeatVent.MATERIALS, 4, java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("GOLD"));
    
    /**
     * Creates a new instance.
     */
    public OverclockedHeatVent() {
        setImage(TextureFactory.getImage(imageFilename));
        setMaxHeat(1000);
        automationThreshold = 900;
    }
    
    /**
     * Gets the name of the component.
     * @return the name of this component.
     */
    @Override
    public String toString() {
        String result = java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("OVERCLOCKED HEAT VENT");
        if (getInitialHeat() > 0) {
            result += String.format(java.util.ResourceBundle.getBundle("Ic2ExpReactorPlanner/Bundle").getString("INITIAL_HEAT_DISPLAY"), (int)getInitialHeat());
        }
        return result;
    }
    
    @Override
    public boolean isHeatAcceptor() {
        return !isBroken();
    }

    @Override
    public void dissipate() {
        Reactor parentReactor = getParent();
        double deltaHeat = Math.min(36, parentReactor.getCurrentHeat());
        parentReactor.adjustCurrentHeat(-deltaHeat);
        this.adjustCurrentHeat(deltaHeat);
        final double currentDissipation = Math.min(20, getCurrentHeat());
        parentReactor.ventHeat(currentDissipation);
        adjustCurrentHeat(-currentDissipation);
        effectiveVentCooling = Math.max(effectiveVentCooling, currentDissipation);
    }
    
    @Override
    public MaterialsList getMaterials() {
        return MATERIALS;
    }

    @Override
    public double getVentCoolingCapacity() {
        return 20;
    }

}
